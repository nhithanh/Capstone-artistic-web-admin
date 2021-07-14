export const LoginPage = () => {
    return (
        <div>
            <div className="flex justify-center">
                <img className= "w-48 h-48" src="https://ouch-cdn2.icons8.com/8kbGG_blA2KmQZCqyZtiC3x4C-KL05sdZprGEOCg054/rs:fit:912:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTEx/LzZhOGNlN2U4LWMz/ODEtNGVlZC05MDlm/LTkxNzVmY2YwMmIz/MS5zdmc.png" />
            </div>

            <div class="px-11 pb-7">
                <p class="text-3xl font-bold tracking-wide pb-8">Login</p>
                <div class="mb-5 py-2 border-b">
                    <input placeholder="Username" />
                </div>
                <div class="py-2 mb-5 border-b">
                    <input placeholder="Password" />
                </div>
                <div class="rounded-xl bg-yellow-300 tracking-wide p-3 text-base shadow-lg text-center">Login</div>
            </div>
        </div>
    )
}