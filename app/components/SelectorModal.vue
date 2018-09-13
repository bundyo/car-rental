<template>
    <Page>
        <ActionBar backgroundColor="red" title="Modal page" icon="" class="list-modal-header"></ActionBar>
        <GridLayout rows="*, auto" ios:class="list-modal-view -ios" android:class="list-modal-view -android">
            <RadListView row="0" :items="source" @itemTap="$modal.close($event.item.value)" selectionBehavior="Press" class="list-modal-list">
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
            <Button class="btn btn-outline" row="1" text="CANCEL" ios:visibility="collapsed" horizontalAlignment="right" @tap="$modal.close()"></Button>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        name: "SelectorModal",

        props: ["title", "items", "selected"],

        data() {
            return {
                source: this.items.map((value, index) => ({ index, value }))
            };
        },

        mounted() {
            console.log(this.$el.nativeView.style.color);
        }
    }
</script>

<style lang="scss">
    // Custom common variables
    @import '../app-variables';

    .list-modal-header {
        color: red;
    }

    // Custom styles
    .list-modal-view {
        color: $blue-dark;
        background-color: $blue-10;

        .list-modal-item {
            vertical-align: center;
            margin-bottom: 10;
        }
    }

    .list-modal-view.-ios {
        height: 100%;
        padding-top: 20;

        .list-modal-item {
            padding: 10 15;
            margin: 0;
            border-bottom-width: $border-width;
            border-color: $blue-20;
            background-color: $background-light;
        }

        .list-modal-list {
            border-top-width: $border-width;
            border-color: $blue-20;
        }

        .list-modal-view-check {
            color: $success-dark;
        }
    }

    .list-modal-view.-android {

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
