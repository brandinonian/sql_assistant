'use client'

import { extract_create_table_query, extract_insert_query } from "@/app/queries";
import { send_chat } from "@/app/server";
import { useEffect, useState } from "react"

export default function ClientView() {

  const [full_response, set_full_response] = useState();
  const [ct_out, set_ct_out] = useState();
  const [ins_out, set_ins_out] = useState();
  const [loading, set_loading] = useState();
  const [input, set_input] = useState();

  async function get_response() {
    set_loading(true);
    const message = await send_chat(input);
    set_full_response(message);
    const create_table_query = extract_create_table_query(message);
    if (create_table_query) {
      set_ct_out(create_table_query);
    }

    const insert_query = extract_insert_query(message);
    if (insert_query) {
      set_ins_out(insert_query);
    }

    set_loading(false);
  }

  function handle_send() {
    get_response();
  }

  return (
    <div>
      <div className="p-8 w-2/3">
        <div>Enter your request</div>
        <textarea value={input} onChange={e => set_input(e.target.value)} className="text-black" />
        <div onClick={e => handle_send()} className="bg-slate-700 p-8 hover:bg-slate-600">
          <div>Send</div>
        </div>
      </div>
      <div className="p-8">
        {loading ? <div>Loading response...</div> :
          <div className="flex flex-col gap-10">
            {/* {full_response && <div>{full_response}</div>} */}
            {ct_out && <div>{ct_out}</div>}
            {ins_out && <div>{ins_out}</div>}
          </div>}
      </div>
    </div>
  )
}