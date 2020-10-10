import Vue from 'vue'

export default Vue.component('stack', {
    render: function (createElement) {
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
