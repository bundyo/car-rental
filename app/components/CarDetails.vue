<template>
    <Page class="page" xmlns="http://schemas.nativescript.org/tns.xsd">

        <ActionBar class="action-bar">
            <NavigationButton @tap="$router.back()" android.systemIcon="ic_menu_back" />
            <Label class="action-bar-title" :text="car.name" horizontalAlignment="center" />
            <ActionItem tap="onEditButtonTap" ios.position="right" android.position="right">
                <Label text="Edit" verticalAlignment="center" class="action-item" />
            </ActionItem>
        </ActionBar>

        <GridLayout class="page-content">
            <ScrollView>
                <GridLayout rows="auto, auto, auto">
                    <Image :src="car.imageUrl" stretch="aspectFill" height="200" class="m-b-15" />

                    <StackLayout row="1" class="hr-light m-t-15 m-b-15"></StackLayout>

                    <GridLayout row="2" rows="*, *, *, *, *, *" columns="auto,auto">
                        <Label text="Price" class="p-l-15 p-b-10 m-r-20 text-secondary"/>
                        <Label col="1" class="text p-b-10">
                            <FormattedString>
                                <Span text="€" />
                                <Span :text="car.price" />
                                <Span text="/day" />
                            </FormattedString>
                        </Label>

                        <Label text="Class" row="1" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                        <Label :text="car.class" row="1" col="1" class="text p-b-10" />

                        <Label text="Doors" row="2" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                        <Label :text="car.doors" row="2" col="1" class="text p-b-10" />

                        <Label text="Seats" row="3" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                        <Label :text="car.seats" row="3" col="1" class="text p-b-10" />

                        <Label text="Transmission" row="4" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                        <Label :text="car.transmission" row="4" col="1" class="text p-b-10" />

                        <Label text="Luggage" row="5" class="p-l-15 p-b-10 m-r-20 text-secondary" />
                        <Label :text="car.luggage" row="5" col="1" class="text p-b-10" />
                    </GridLayout>
                </GridLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script>
    export default {
        data() {
            return {
                car: {}
            };
        },

        computed: {
            cars() {
                return this.$router.app && this.$router.app.cars || [];
            },

            isLoading() {
                return !this.cars.length;
            }
        },

        watch: {
             $route(route) {
                console.log(route);
                this.car = route.params.car;
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
