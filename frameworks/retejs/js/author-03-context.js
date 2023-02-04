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
      this._editor.use(ContextMenuPlugin.default);

      this._engine = new Rete.Engine("demo@0.1.0");

      this._editor.on("process nodecreated noderemoved connectioncreated connectionremoved", async () => {
        await this._engine.abort();
        await this._engine.process(this._editor.toJSON());
      });
      this._editor.view.resize();
      AreaPlugin.zoomAt(this._editor);
      this._editor.trigger("process");

      let first = await this.addKnot("First", 10, 10);
      let second = await this.addKnot("Second", 250, 10);
      this._editor.connect(first.outputs.get("flw"), second.inputs.get("flw"));
   }

   async addKnot(title, x, y) {
      let knot = new KnotComponent(title);
      this._editor.register(knot);
      this._engine.register(knot);

      let k = await knot.createNode();
      const coord = this.adjustCoordinates(x, y);
      k.position = [coord.x, coord.y];
      this._editor.addNode(k);
      return k;
   }

   adjustCoordinates(x, y) {
      return {
         x: x - (this._editorWidth / 2),
         y: y - (this._editorHeight / 2)
      };
   }
}

(function() {
   AuthorFlowManager.s = new AuthorFlowManager();
})();