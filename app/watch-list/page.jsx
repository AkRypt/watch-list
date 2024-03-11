import { cookies } from "next/headers";
import EditWatch from "../components/EditWatch";
import WatchForm from "../components/WatchForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { deleteWatch } from "../server-actions/deleteWatch";

export default async function WatchList() {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies: () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    const {data: watches, error} = await supabase
    .from("watches")
    .select("*")
    .eq("user_id", user.id)
    .order("brand", {ascending: true});

    if (error) {
        console.error('Error watches')
    }
    
    console.log({watches})

    return (
        <div>
            <div className="px-20 py-10">
                <div className="flex justify-between items-start">
                    <h1>
                        My Watch List
                    </h1>
                    <form action="/auth/signout" method="post">
                        <button type="submit"
                        className="bg-gray-600 font-bold py-2 px-2 rounded-lg">
                            Sign Out
                        </button>
                    </form>
                </div>
                <WatchForm />
                <div>
                    {
                        watches.map((watch) => (
                            <div key={watch.id}>
                                <h2>{watch.brand} - {watch.model}</h2>
                                <div>
                                    <form action={deleteWatch}>
                                        <input type="hidden" name="id" value={watch.id} />
                                        <button type="submit" className="rounded p-2 bg-red-600 hover:bg-red-200">
                                            Delete
                                        </button>
                                    </form>
                                    <EditWatch watch={watch} />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}