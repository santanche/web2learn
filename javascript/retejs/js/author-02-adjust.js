/*
 * Flow Author Environment
 *
 */

class AuthorFlowManager {
   async start(editorWidth, editorHeight) {
      this._editorWidth = editorWidth;
      this._editorHeight = editorHeight;

      const container = document.querySelector("#rete");
      this._editor = new Rete.NodeEditor("demo@0.1.0", container);

      this._editor.use(ConnectionPlugin.default);

      this._editor.use(VueRenderPlugin.default);

      this._editor.use(AreaPlugin, {
         background: false,
         snap: false,
         scaleExtent: {min: 0.1, max: 1},
         translateExtent: {width: 5000, height: 4000}
      });
      
      this._editor.use(AutoArrangePlugin.default,
                       {margin: {x: 50, y: 50 }, depth: 0});
      
      this._engine = new Rete.Engine("demo@0.1.0");

      this._editor.on("process nodecreated noderemoved connectioncreated connectionremoved", async () => {
        await this._engine.abort();
        await this._engine.process(this._editor.toJSON());
      });
      this._editor.view.resize();
      this._editor.trigger("process");

      let first = await this.addKnot("First");
      let second = await this.addKnot("Second");
      this._editor.connect(first.outputs.get("flw"), second.inputs.get("flw"));

      this._editor.trigger("arrange");

      AreaPlugin.zoomAt(this._editor);
   }

   async addKnot(title) {
      let knot = new KnotComponent(title);
      this._editor.register(knot);
      this._engine.register(knot);

      let k = await knot.createNode();
      this._editor.addNode(k);
      return k;
   }
}

(function() {
   AuthorFlowManager.s = new AuthorFlowManager();
})();