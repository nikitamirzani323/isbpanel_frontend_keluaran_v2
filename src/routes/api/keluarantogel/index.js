import { MY_GO_BACKEND_URL } from '$lib/Env';
export async function post({request,url}){
    const path_api = MY_GO_BACKEND_URL
    const object =  await request.json();
    const keluaran_id = object.keluaran_id
    const resdata = await fetch(path_api+"api/keluaran", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "client_Device": "WEBSITE",
            "client_hostname": url.host,
            "pasaran_id": keluaran_id,
        }),
    });
    const jsondata = await resdata.json();
    const status = jsondata.status;
    const message = jsondata.message;
    const paito_minggu = jsondata.paito_minggu == null ? "":jsondata.paito_minggu;
    const paito_senin = jsondata.paito_senin == null ? "":jsondata.paito_senin;
    const paito_selasa = jsondata.paito_selasa == null ? "":jsondata.paito_selasa;
    const paito_rabu = jsondata.paito_rabu == null ? "":jsondata.paito_rabu;
    const paito_kamis = jsondata.paito_kamis == null ? "":jsondata.paito_kamis;
    const paito_jumat = jsondata.paito_jumat == null ? "":jsondata.paito_jumat;
    const paito_sabtu = jsondata.paito_sabtu == null ? "":jsondata.paito_sabtu;
    const pasaran_nama = jsondata.pasaran_nama;
    const pasaran_livedraw = jsondata.pasaran_livedraw;
    const pasaran_jadwal = jsondata.pasaran_jadwal;
    const pasaran_diundi = jsondata.pasaran_diundi;
    const pasaran_title = jsondata.pasaran_title;
    const pasaran_descp = jsondata.pasaran_descp;
    if(status == 200){
        return {
            status:status,
            body:{
                paito_minggu:paito_minggu,
                paito_senin:paito_senin,
                paito_selasa:paito_selasa,
                paito_rabu:paito_rabu,
                paito_kamis:paito_kamis,
                paito_jumat:paito_jumat,
                paito_sabtu:paito_sabtu,
                pasaran_nama:pasaran_nama,
                pasaran_livedraw:pasaran_livedraw,
                pasaran_jadwal:pasaran_jadwal,
                pasaran_diundi:pasaran_diundi,
                pasaran_title:pasaran_title,
                pasaran_descp:pasaran_descp,
                listpasaran:jsondata.list_pasaran,
                data:jsondata.record
            }
        }
    }else{
        return {
            status:400,
            body:{data:message}
        }
    }
}