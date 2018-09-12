<template>
    <GridLayout rows="auto, *, auto" verticalAlignment="top" class="list-modal-view">
        <Label :text="title" class="h3 list-modal-header"></Label>
        <RadListView row="1" :items="source" @itemTap="$modal.close($event.item.value)" selectionBehavior="Press" class="list-modal-list">
            <v-template>
                <GridLayout>
                    <GridLayout android:visibility="collapsed" columns="*,auto" class="list-modal-item">
                        <Label :text="item.value"></Label>
                        <Label col="1" text.decode="&#xf00c;"
                            class="fa list-modal-view-check"
                            v-show="item.selected"></Label>
                    </GridLayout>
                    <GridLayout ios:visibility="collapsed" columns="auto,*" class="list-modal-item">
                        <Label text.decode="&#xf10c;"
                            class="fa list-modal-view-icon" verticalAlignment="center"
                            v-show="item.selected"></Label>
                        <Label text.decode="&#xf192;"
                            class="fa list-modal-view-icon selected" verticalAlignment="center"
                            v-show="item.selected"></Label>
                        <Label col="1" :text="item.value"></Label>
                    </GridLayout>
                </GridLayout>
            </v-template>
        </RadListView>
        <Button class="btn btn-outline" row="3" text="CANCEL" ios:visibility="collapsed" horizontalAlignment="right" @tap="$modal.close()"></Button>
    </GridLayout>
</template>

<script>
    export default {
        name: "SelectorModal",

        props: ["title", "items", "selected"],

        data() {
            return {
                source: this.items.map((value, index) => ({ index, value }))
            };
        }
    }
</script>

<style scoped lang="scss">
    @import '../app-variables';

    .list-modal-view {

        .list-modal-header {
            padding: 15;
        }

        .list-modal-item {
            padding: 0 15 10 15;
        }

        .list-modal-view-icon {
            margin-right: 15;
            margin-top: 2;

            &.selected {
               color: $accent-dark;
            }
        }

        .btn.btn-outline {
            border-color: transparent;
            font-size: 12;
            padding-right: 0;
            text-align: right;
        }
    }
</style>
