<template>
    <div class="overflow-x-scroll pb-8">
        <table class="w-full">
            <thead>
                <tr>
                    <th v-for="(col, index) in filter.cols" :key="index">
                        <div :style="{ width: col.width }">
                            <p v-if="col.width === undefined">{{ col.title }}</p>
                            <p v-else>{{ col.title }}</p>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, di) in data" :key="di">
                    <td v-for="(col, ci) in filter.cols" :key="ci">
                        <div v-if="col.type === 'normal' || col.type === undefined">
                            <p class="text-nowrap" :class="col.class">{{ getValue(d, col.data) }}</p>
                        </div>
                        <div v-if="col.type === 'icon'">
                            <div :class="col.class">
                                <div :class="col.classIcon" @click="handleClick(d, col.indetity)">
                                    <component :is="col.icon"/>
                                </div>                         
                                <p>{{ col.text }}</p>       
                            </div>
                        </div>
                        <div v-if="col.type === 'actions'" class="flex justify-center space-x-3 ">
                            <div v-for="(a, ai) in col.actions" :key="ai" class="relative flex justify-center ">
                                <div class="flex justify-center">
                                    <button @click="handleClick(d, a.type)" class="relative rounded-full items-center flex justify-center z-10 w-8 h-8"
                                        :class="a.class">
                                        <div class="flex justify-center rounded-full items-center">
                                            <component :is="a.icon" />
                                        </div>
                                    </button>
                                    <div class="absolute h-full hidden z-0 ">
                                        <div class="h-full"></div>
                                        <p
                                            class="bg-gray-700 rounded-full px-3 py-2 text-sm font-bold text-white z-11 relative items-center w-fit">
                                            {{ a.label }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  

<script>

export default {
    name: 'Table',
    props: {
        filter: {
            type: Object,
            default: () => {
                cols: [
                    {
                        title: String,
                        data: Function,
                        type: String
                    }
                ]
            }
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getValue(d, f) {
            const value = f(d)
            return value
        },
        handleClick(action, type) {
            action.type = type
            this.$emit('onRow', action)
        }
    }
}

</script>
<style scoped>
/* Estilos adicionales según sea necesario */
th,
td {
    padding: 0.5em 0.4em;
    border: 1px solid rgb(189, 90, 255);
}

/* Estilo para alinear verticalmente el label */
p {
    margin: 0;
}

button:hover+div {
    display: block;
}
</style>