import Vue from 'vue'

export default Vue.component('Stack', {
    render: function (createElement) {
        // eslint-disable-next-line vue/require-slots-as-functions
        let stackNodes = this.$slots.default.filter((child) => child.tag)

        return createElement(
            'div',
            { class: '-mt-8' },
            stackNodes.map((node) =>
                createElement(
                    'div',
                    {
                        class: 'mt-8',
                    },
                    [node],
                ),
            ),
        )
    },
})
