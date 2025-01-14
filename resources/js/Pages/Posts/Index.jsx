import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import toast, {Toaster} from 'react-hot-toast';

export default function Index({ auth, posts, now }) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm('StorePost', {
            body: "",
        });

    // const page = usePage();

    // useEffect(()=> {
    //     if(page?.props?.message?.body){
    //         toast(page.props.message.body, {
    //             type: page.props.message.type,
    //             position: "top-right",
    //         })

    //       }
    // })

    function submit(e) {
        e.preventDefault();
        post(route('posts.store'), {
            onSuccess: () => {
                reset('body')
                toast.success('Message added successfully!',{
                    position: "top-right",
                    style: {
                        border: '1px solid black',
                      },
                });
            },
        });
    }

    function refreshPosts() {
        router.visit(route('posts.index'), {
            only: ['posts'],
            preserveScroll: true,
            preserveState: true,
        });
    }

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
                <meta name="description" content="Posts Index" />

            </Head>




            <div className="bg-gray-100 min-h-screen p-4">
            <div>
                <p>Time: {now}</p>
            </div>

            <div>
                {/* <button onClick={notify}>Make me a toast</button> */}
                <Toaster />
            </div>

            <div className="mt-4 p-4">
    <form
    onSubmit={submit}
    className="flex flex-col mx-auto gap-2 max-w-lg">
        <fieldset className="contents">
            <div className="flex flex-col">
                <label htmlFor="input" className="font-semibold text-lg">
                    Enter your post
				</label>
                <textarea
                onChange={(e) =>
                    setData('body', e.target.value)
                }
                onFocus={() => clearErrors("body")}
                name="body"
                id="body"
                cols="30"
                rows="5"
                value={data.body}
                maxLength="256"
                required=""
				placeholder="Today is a beatiful day ... "
				className="rounded-lg p-4 bg-black/5 border-2 border-solid border-black/10 font-mono font-medium text-sm">
                </textarea>

                {errors.body && (
                    <p className="text-red-500">{errors.body}</p>
               )}

            </div>
            <button type="submit"
            disabled={processing}
			className={`rounded-lg p-3 bg-blue-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-blue-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2
                        // ${processing && "opacity-50"}
                    `}>

				<span className="font-bold">Eneter your post!</span>
			</button>
        </fieldset>
    </form>
</div>
    <div className='py-3 flex justify-center'>
        <Link
            href={route('posts.index')}
            only={['posts']}
            preserveScroll
        className='text-sm text-indigo-500 hover:text-indigo-900'
        type='button'
        >
            Refresh posts
        </Link>
    </div>

    {/* <div className='py-3 flex justify-center'>
        <button
        onClick={refreshPosts}
        className='text-sm text-indigo-500 hover:text-indigo-900'
        type='button'
        >
            Refresh posts
        </button>
    </div> */}


    <div className="container mx-auto pt-12 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {posts.data.map((post)=>{
                        return(

            <div key={post.id}
            className="bg-white rounded-lg shadow-lg p-8">
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


        </AuthenticatedLayout>
    );
}
