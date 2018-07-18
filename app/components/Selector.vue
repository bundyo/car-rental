<template>
    <Label>
        <Label :text="label" class="car-list-odd" />
        <Label @tap="onSelectorTap" tag="class" class="car-list-even">
            <Label :text="selected" />
            <Label text.decode="&#xf054;" class="fa text-secondary" col="1" horizontalAlignment="right" verticalAlignment="center" />
        </Label>
    </Label>
</template>

<script>
    export default {
        name: "Selector",

        model: {
            prop: "text",
            event: "select"
        },

        props: {
            text: String,
            label: String
        },

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

<style scoped>

</style>
