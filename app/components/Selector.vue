<template>
    <GridLayout rows="*, *" columns="*, auto" @tap="onSelectorTap">
        <Label row="0" col="0" colSpan="2" :text="label" class="car-list-odd" />
        <Label row="1" col="0" :text="selected" class="car-list-even" @tap="onSelectorTap" />
        <Label row="1" col="1" text.decode="&#xf054;" class="fa text-secondary car-list-even" @tap="onSelectorTap" />
    </GridLayout>
</template>

<script>
    export default {
        name: "Selector",

        model: {
            prop: "text",
            event: "select"
        },

        props: ["text", "label"],

        data() {
            return {
                selected: this.text
            }
        },

        methods: {
            onSelectorTap() {
                this.$emit("select", this.selected);
            }
        }
    }
</script>
