import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request,url}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const slug = object.slug
    const resdata = await fetch(path_api+"api/providerslotdetail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_Device": "WEBSITE",
            "client_hostname": url.host,
            "providerslot_slug": slug,
        }),
    });
    const jsondata = await resdata.json();
    
    const status = jsondata.status;
    const message = jsondata.message;
    const providerslot_name = jsondata.providerslot_name;
    const providerslot_image = jsondata.providerslot_image;
    const providerslot_title = jsondata.providerslot_title;
    const providerslot_descp = jsondata.providerslot_descp;
    if(status == 200){
        return {
            status:status,
            body:{
                providerslot_name:providerslot_name,
                providerslot_image:providerslot_image,
                providerslot_title:providerslot_title,
                providerslot_descp:providerslot_descp
            }
        }
    }else{
        return {
            status:400,
            body:{
                providerslot_name:"",
                providerslot_image:"",
                providerslot_title:"",
                providerslot_descp:""
            }
        }
    }
}