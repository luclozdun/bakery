<template>
    <div v-if="show" class="flex justify-center mt-12">
      <div class="md:w-4/6 w-full mx-8 flex flex-col items-center py-8 rounded-md border-dashed border-primary border">
        <p class="text-xl text-primary text-center font-bold underline">LO SENTIMOS</p>
        <div class="w-28 h-28 rounded-full bg-primary my-6">
            
        </div>
        <p class="text-lg text-primary-200 w-4/5 text-center">{{  message }}</p>
      </div>
    </div>
</template>

<script>
export default{
    name: 'Empty',
    props: {
        show: Boolean,
        message: String
    }
}

</script>