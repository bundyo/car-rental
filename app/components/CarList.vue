<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Car List" horizontalAlignment="center" />
        </ActionBar>

        <GridLayout class="page-content">
            <!--<ListView v-if="!isLoading" for="item in cars" @itemTap="onItemTap">-->
            <RadListView v-if="!isLoading" for="item in cars" @itemTap="onItemTap" class="list-group">
                <ListViewLinearLayout v-tkListViewLayout scrollDirection="Vertical"/>
                <v-template>
                    <StackLayout class="list-group-item">

                        <GridLayout rows="*, *, *" columns="*, *" class="list-group-item-content">
                            <Label :text="item.name" class="text-primary font-weight-bold"/>
                            <Label col="1" horizontalAlignment="right" class="list-group-item-text m-r-5">
                                <FormattedString>
                                    <Span text="€"/>
                                    <Span :text="item.price"/>
                                    <Span text="/day"/>
                                </FormattedString>
                            </Label>

                            <StackLayout row="1" class="hr-light m-t-5 m-b-5" colSpan="2"/>

                            <!--<Label row="2" :text="item.imageUrl" class="text-primary font-weight-bold"/>-->
                            <Image row="2" :src="item.imageUrl" stretch="aspectFill" height="120" class="m-r-20" loadMode="async"/>

                            <StackLayout row="2" col="1" verticalAlignment="center" class="list-group-item-text">
                                <Label class="p-b-10">
                                    <FormattedString ios:fontFamily="system">
                                        <Span text="   " class="fa text-primary"></Span>
                                        <Span :text="item.class"/>
                                    </FormattedString>
                                </Label>
                                <Label class="p-b-10">
                                    <FormattedString ios:fontFamily="system">
                                        <Span text="   " class="fa text-primary"/>
                                        <Span :text="item.transmission"/>
                                        <Span text=" Transmission"/>
                                    </FormattedString>
                                </Label>
                                <Label class="p-b-10">
                                    <FormattedString ios:fontFamily="system">
                                        <Span text="   " class="fa text-primary"/>
                                        <Span :text="item.hasAC ? 'Yes' : 'No'"/>
                                    </FormattedString>
                                </Label>
                            </StackLayout>
                        </GridLayout>

                    </StackLayout>
                </v-template>
            </RadListView>
            <!--</ListView>-->
            <ActivityIndicator v-else :busy="isLoading"/>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        computed: {
            cars() {
                return this.$router.app && this.$router.app.cars || [];
            },

            isLoading() {
                return !this.cars.length;
            }
        },

        methods: {
            onItemTap(e) {
                this.$emit("select", e.item);
                this.$router.push(`/car-details/${e.item.name}`);
            }
        },

        created() {
        },

        beforeDestroy() {
        }
    };
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    // Custom styles
    .list-group {
        .list-group-item {
            padding: 0 0 8 0;
            background-color: $blue-10;

            .list-group-item-content {
                padding: 8 15 4 15;
                background-color: $background-light;
            }

            .fa {
                color: $accent-dark;
            }
        }
    }
</style>
