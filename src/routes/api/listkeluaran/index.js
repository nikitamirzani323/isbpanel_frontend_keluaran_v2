import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const hostname = object.hostname
    const resdata = await fetch(path_api+"api/pasaran", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_hostname": hostname,
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