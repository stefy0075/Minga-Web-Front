import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiUrl from "../../url";

const read_myMangas = createAsyncThunk(
    'read_myMangas', 
    async ({ page, categories, headers }) => {
        try{
            let response = await axios.get(apiUrl+"mangas/me?page="+page+"&category="+categories,headers)
            return { myMangas: response.data.mangas }

        }catch (error) {
            return { myMangas: ' ' }
            
        }

    } 

)

const actions = { read_myMangas }
export default actions