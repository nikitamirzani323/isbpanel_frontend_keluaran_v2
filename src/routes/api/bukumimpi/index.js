import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const hostname = object.hostname
    const bukumimpi_nama = object.bukumimpi_nama
    const bukumimpi_tipe = object.bukumimpi_tipe
    const resdata = await fetch(path_api+"api/bukumimpi", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_hostname": hostname,
            "nama": bukumimpi_nama,
            "tipe": bukumimpi_tipe,
        }),
    });
    const jsondata = await resdata.json();
    const status = jsondata.status;
    const message = jsondata.message;
    if(status == 200){
        return {
            status:status,
            body:{data:jsondata.record}
        }
    }else{
        return {
            status:400,
            body:{data:message}
        }
    }
}