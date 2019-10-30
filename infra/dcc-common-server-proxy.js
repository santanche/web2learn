/**
 * 
 */

class DCCCommonServer {

   constructor() {
      this.userLogin = this.userLogin.bind(this);
      MessageBus.ext.subscribe("data/user/login", this.userLogin);
      this.casesList = this.casesList.bind(this);
      MessageBus.ext.subscribe("data/case/*/list", this.casesList);
      this.loadCase = this.loadCase.bind(this);
      MessageBus.ext.subscribe("data/case/+/get", this.loadCase);
      this.loadTheme = this.loadTheme.bind(this);
      MessageBus.ext.subscribe("data/theme/+/get", this.loadTheme);
      this.contextList = this.contextList.bind(this);
      MessageBus.int.subscribe("data/context/*/list", this.contextList);
      this.loadContext = this.loadContext.bind(this);
      MessageBus.int.subscribe("data/context/+/get", this.loadContext);
   }

   get token() {
      return this._token;
   }

   set token(newToken) {
      this._token = newToken;
   }
   
   /*
    * Wrappers of the services
    * ************************
    */

   async userLogin(topic, message) {
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "POST",
         "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify({"email": message.email,
                                  "password": message.password})
      }

      const response = await fetch(DCCCommonServer.managerAddressAPI + "user/login", header);
      const jsonResponse = await response.json();
      const busResponse = {
         userid: jsonResponse.id,
         token: jsonResponse.token
      };
      this._token = jsonResponse.token;
      MessageBus.ext.publish(MessageBus.buildResponseTopic(topic, message),
                             busResponse);
   }

   async casesList(topic, message) {
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "POST",
         "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + DCCCommonServer.instance.token
          }
      }
      const response = await fetch(DCCCommonServer.managerAddressAPI + "case/list", header);
      const jsonResponse = await response.json();
      let busResponse = [];
      for (let c in jsonResponse)
         busResponse.push({
            id:   jsonResponse[c].uuid,
            name: jsonResponse[c].name,
            icon: "../resources/icons/mono-slide.svg",
            svg : jsonResponse[c].svg
         });
      MessageBus.ext.publish(MessageBus.buildResponseTopic(topic, message),
                             busResponse);
   }
   
   async loadCase(topic, message) {
      const caseId = MessageBus.extractLevel(topic, 3);
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "GET",
         "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._token
          }
      };
      const response =
         await fetch(DCCCommonServer.managerAddressAPI + "case/" + caseId, header);

      const jsonResponse = await response.json();

      MessageBus.ext.publish(MessageBus.buildResponseTopic(topic, message),
                             {name: jsonResponse.name,
                              source: jsonResponse.source});
   }

   async loadTheme(topic, message) {
      const themeCompleteName = MessageBus.extractLevel(topic, 3);
      const separator = themeCompleteName.indexOf("."); 
      const themeFamily = themeCompleteName.substring(0, separator);
      const themeName = themeCompleteName.substring(separator+1);
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "GET",
         "headers": {
            "Content-Type": "text/html",
          }
      }
      const response = await fetch("../themes/" + themeFamily + "/" + themeName +
                                   ".html", header);
      let textResponse = await response.text();
      MessageBus.ext.publish(MessageBus.buildResponseTopic(topic, message),
                             textResponse);
   }

   async contextList(topic, message) {
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "GET",
         "headers": {
            "Content-Type": "application/json",
          }
      };
      const response = await fetch("../context/context.json", header);
      let ctxCatalog = await response.json();
      MessageBus.int.publish(MessageBus.buildResponseTopic(topic, message),
                             ctxCatalog);
   }

   async loadContext(topic, message) {
      let header = {
         "async": true,
         "crossDomain": true,
         "method": "GET",
         "headers": {
            "Content-Type": "text/json",
          }
      };
      const response = await fetch("../context/" + message.body, header);
      let textResponse = await response.text();
      MessageBus.int.publish(MessageBus.buildResponseTopic(topic, message),
                             textResponse);
   }
}

(function() {
   DCCCommonServer.instance = new DCCCommonServer();
})();