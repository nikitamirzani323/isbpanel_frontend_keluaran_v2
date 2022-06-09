import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request,url}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const resdata = await fetch(path_api+"api/pasaran", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_Device": "WEBSITE",
            "client_hostname": url.host,
        }),
    });
    const jsondata = await resdata.json();
    const status = jsondata.status;
    const message = jsondata.message;
    if(status == 200){
        return {
            status:status,
            headers: {
                'Cache-Control': 'max-age=0, s-maxage=60',
            },
            body:{data:jsondata.record}
        }
    }else{
        return {
            status:400,
            body:{data:message}
        }
    }
}