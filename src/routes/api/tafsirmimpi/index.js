import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const hostname = object.hostname
    const tafsirmimpi_search = object.tafsirmimpi_search
    console.log(hostname)
    const resdata = await fetch(path_api+"api/tafsirmimpi", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_hostname": hostname,
            "search": tafsirmimpi_search,
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