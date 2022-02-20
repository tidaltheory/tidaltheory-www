<script>
import Heading from '~/components/Heading.vue'
import PageSection from '~/components/page-section.vue'
import Text from '~/components/Text.vue'
export default {
    components: { Heading, PageSection, TextContent: Text },
}
</script>

<template>
    <PageSection>
        <div class="grid grid-cols-4 xl:grid-cols-2 xl:gap-16">
            <div class="col-span-full md:col-span-3 md:pt-8 xl:pt-12">
                <Heading><slot /></Heading>
            </div>
            <div
                v-if="!!$slots.intro"
                class="
                    col-span-3
                    md:col-start-2
                    row-start-2
                    pt-[9vh]
                    md:pt-[11vh]
                    xl:pt-36
                "
            >
                <TextContent element="p">
                    <slot name="intro" />
                </TextContent>
            </div>
        </div>
    </PageSection>
</template>
