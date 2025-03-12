import axios from "axios";
const url="/api/persons"

const getAll = () =>{
    const request=axios.get(url)
    return request.then(response => response.data)
}

const create = (newObject) =>{
    const request=axios.post(url,newObject)
    return request.then(response => response.data)
}

const update = (id,updatedObject) =>{
    const request=axios.put(`${url}/${id}`,updatedObject)
    return request.then(response => response.data)
}

const remove = (id) =>{
    const request=axios.delete(`${url}/${id}`)
    return request.then()
}
export default{
    getAll,
    create,
    update,
    remove
}