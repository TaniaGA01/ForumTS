<script setup lang="ts">
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

const props = defineProps({
    timestamp: Number
});
const diffForHumans = (): string => { // converting date
    return dayjs.unix(props.timestamp as number).fromNow()
}

const humanFriendlyDate = (): string => {// date title
    return dayjs.unix(props.timestamp as number).format('llll')
}
</script>
<template>
    <small :title="humanFriendlyDate()">
        {{ diffForHumans() }}
    </small>
</template>