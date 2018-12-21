/**
 * @author João R. Santos <up201809187@fe.up.pt>
 */

export const toastManager = {
    methods: {
        showToast(message) {
            this.$toast.open({
                message: message,
                position: 'is-bottom'
            })
        }
    }
}
