const Vue = require("nativescript-vue");

const component = {
    name: "RadListView",
    props: {
        items: {
            type: [Array, Object],
            required: true
        },
        "+alias": {
            type: String,
            default: "item"
        },
        "+index": {
            type: String
        }
    },
    template: `
    <NativeRadListView
      ref="radlistView"
      :items="items"
      v-bind="$attrs"
      v-on="listeners"
      @itemTap="onItemTap"
      @itemLoading="onItemLoading"
    >
      <slot />
    </NativeRadListView>
  `,

    watch: {
        items: {
            handler(newVal) {
                this.$refs.radlistView.setAttribute("items", newVal);
                this.refresh();
            },
            deep: true
        }
    },

    created() {
        // we need to remove the itemTap handler from a clone of the $listeners
        // object because we are emitting the event ourselves with added data.
        const listeners = Object.assign({}, this.$listeners);
        delete listeners.itemTap;
        this.listeners = listeners;

        this.getItemContext = getItemContext.bind(this);
    },

    mounted() {
        this.$refs.radlistView.setAttribute("items", this.items);
        this.$refs.radlistView.setAttribute(
            "_itemTemplatesInternal",
            this.$templates.getKeyedTemplates()
        );

        this.$refs.radlistView.setAttribute("_itemTemplateSelector", (item, index) => {
            return this.$templates.selectorFn(this.getItemContext(item, index));
        });

        const availableTemplates = this.$templates.getAvailable();
        this.$refs.radlistView.setAttribute("itemViewLoader", (itemType) => {
            // todo add other itemTypes
            switch (itemType) {
                case "itemview":
                    return this.$templates.getKeyedTemplate("default").createView();
                case "headerview":
                    if (~availableTemplates.indexOf("header")) {
                        return this.$templates.getKeyedTemplate("header").createView();
                    }
                case "footerview":
                    if (~availableTemplates.indexOf("footer")) {
                        return this.$templates.getKeyedTemplate("footer").createView();
                    }
            }
        });
    },

    methods: {
        onItemTap(args) {
            this.$emit(
                "itemTap",
                Object.assign({ item: this.items[args.index] }, args)
            );
        },
        onItemLoading(args) {
            const index = args.index;
            const items = args.object.items;

            const currentItem =
                typeof items.getItem === "function"
                    ? items.getItem(index)
                    : items[index];

            const name = args.object._itemTemplateSelector(currentItem, index, items);
            const context = this.getItemContext(currentItem, index);
            const oldVnode = args.view && args.view[VUE_VIEW];

            args.view = this.$templates.patchTemplate(name, context, oldVnode);
        },
        refresh() {
          this.$refs.radlistView.nativeView.refresh()
        }
    }
};

Vue.registerElement(
  'RadListView',
  () => require('tns-core-modules/ui/list-view').ListView,
  {
    component
  }
);

Vue.registerElement("ListViewLinearLayout", () => require("nativescript-ui-listview").ListViewLinearLayout);
Vue.registerElement("ListViewGridLayout", () => require("nativescript-ui-listview").ListViewGridLayout);

Vue.directive("tkListViewLayout", {
    inserted: function (el) {
        el.parentNode._nativeView.listViewLayout = el._nativeView;
    }
});

const VUE_VIEW = "__vueVNodeRef__";

module.exports = component;

function getItemContext(item, index, alias = this.$props["+alias"], index_alias = this.$props["+index"]) {
    return {
        [alias]: item,
        [index_alias || "$index"]: index,
        $even: index % 2 === 0,
        $odd: index % 2 !== 0
    }
}
