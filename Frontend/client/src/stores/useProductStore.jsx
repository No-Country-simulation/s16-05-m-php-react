import { getProduct, getCategory } from "@/axios/fetch";
import { data } from "autoprefixer";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useProductStore = create(
    devtools(
        (set) => ({
            nameCategory: null,
            dataCategory: null,
            product: null,
            error: null,
            loading: false,
            fetchProduct: async (id) => {
                set({ loading: true, error: null });
                try{
                    const categories = await getCategory();
                        var check = "";
                        var arrayCategory = [];
                        const arrayCategories = categories['hydra:member'];
                        for(var i = 0; i < arrayCategories.length; i++){
                            if(arrayCategories[i]['id'] == id){
                                check = arrayCategories[i]['name'];
                            }
                            arrayCategory.push({id: arrayCategories[i]['id'], name: arrayCategories[i]['name']});
                        }
                        set({dataCategory: arrayCategory});
                        if(check !== ""){
                            set({nameCategory: check});
                            try {
                                const data = await getProduct(id);
                                set({ product: data, loading: false });
                            } catch (error) {
                                set({
                                    error: "Error al obtener los datos de la Base de Datos products",
                                    loading: false,
                                });
                            }
                        }else{
                            window.location.href = "/404";
                        }
                }catch(error){
                    set({
                        error: "Error al obtener los datos de la Base de Datos categories",
                        loading: false,
                    });
                }
                
            },
        }),
    { name: "ProductStore" }
    )
);

export default useProductStore;
