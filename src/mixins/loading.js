/**
 * @author João R. Santos <up201809187@fe.up.pt>
 */

export const loading = {
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        toggleLoading() {
            this.isLoading = !this.isLoading;
        }
    }
}
 