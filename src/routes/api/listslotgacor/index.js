import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request,url}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const slug = object.slug
    const limit = object.limit
    const resdata = await fetch(path_api+"api/prediksislot", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_Device": "WEBSITE",
            "client_hostname": url.host,
            "providerslot_id": slug,
            "prediksislot_limit": limit,
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
            body:{data:[]}
        }
    }
}