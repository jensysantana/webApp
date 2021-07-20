import { derived, writable } from "svelte/store";
// const openWithArr = [
//     {
//         name: 'Chat'
//     },
// ];
const openWithArr = [
    'Chat'
];
function sideBarRightStore() {
    const {
        update,
        subscribe,
        set
    } = writable({
        openWith: '',
        // openWithArr
    });

    return {
        subscribe,
        setOpenWith: (arg) => update((data) => {
            if (!arg || typeof arg !== 'string' || !openWithArr.includes(arg)) {
                return;
            }
            data.openWith = arg;
            return data;
        })
    }
}

export const sideBarRightStoreInit = sideBarRightStore();

export const getOpenWith = derived(sideBarRightStoreInit, ($sideBarRightStoreInit) => {
    console.log('---------$sideBarRightStoreInit.openWith---------');
    console.log($sideBarRightStoreInit);
    console.log('---------$sideBarRightStoreInit.openWith---------');
    return $sideBarRightStoreInit;
})