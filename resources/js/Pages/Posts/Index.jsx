import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({auth, posts}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="Posts">
                <meta name='description' content='Posts Index'/>
            </Head>


            <div className="bg-gray-100 min-h-screen p-4">
            <div className="mt-4 p-4">
    <form className="flex flex-col mx-auto gap-2 max-w-lg">
        <fieldset className="contents">
            <div className="flex flex-col">
                <label htmlFor="input" className="font-semibold text-lg">
                    Enter your post
				</label>
                <textarea name="input" id="input" rows="5" maxLength="256" required=""
					placeholder="Today is a beatiful day ... "
					className="rounded-lg p-4 bg-black/5 border-2 border-solid border-black/10 font-mono font-medium text-sm">
                </textarea>
            </div>
            <button type="submit"
				className="rounded-lg p-3 bg-blue-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-blue-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2">
                    
				<span className="font-bold">Eneter your post!</span>
			</button>
        </fieldset>
    </form>
</div>
    <div className="container mx-auto pt-12 pb-20">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {posts.data.map((post)=>{
                        return(

            <div key={post.id} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{post.user.name}</h2>
                <p key={post.id} className="text-gray-700">
                    {post.body}
                </p>
            </div>
            )
        })}

            
        </div>
    </div>
</div>

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                    {posts.data.map((post)=>{
                        return(
                            <div key={post.id}>
                                <div className='font-semibold'>
                                    {post.user.name}
                                </div>
                                <p className='mt-1'>{post.body}</p>
                            </div>

                            // <div key={post.id} className="p-6 text-gray-900">
                            //     {post.body}
                            // </div>
                        
                        )
                    })}

                        
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
