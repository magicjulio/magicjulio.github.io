
export default function Blogs() {
  return (
    <div className="px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-cyan-400">Blogs</h1>
      <div className="mt-10 flex flex-col items-center gap-8">
      <p className="text-gray-300 mt-4">I have a technical Blog about my Bug Bounty Learning progress explaining diffrent type of Vurnabilities</p>
      
        <p>Read it on <a href="https://medium.com/@julius.grosserode.19" className="href">Medium</a></p>
        <p>I also have a substack for philosophy. Currently not that active: <a href="https://substack.com/@juliuspy">Substack</a></p>
    </div>
      <br />
    <p className="text-gray-300 mt-4">Iam planning on making a new blog about my ML Journey ...</p>
     </div>
  );
}
