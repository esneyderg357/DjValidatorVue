<template>
    <p class="dj-validator-msg" v-if="props.error">{{props.error}}</p>
</template>
<script setup>
const props=defineProps(['error'])
</script>
<style scoped>

.dj-validator-msg{
    color:var(--dj-validator-error-color,red);
    text-align:inherit; 
    font-size: var(--dj-validator-text-size,.8rem);
    font-style: italic;
    font-weight: bold;
    margin-top:0px;
    margin-bottom:0px;
}

</style>