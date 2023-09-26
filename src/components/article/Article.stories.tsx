import { Button } from "@/components/ui/button";
import avatarImage from "../../assets/avatar.png";
import blogImage from "@/assets/blog-img.svg";
import { Header } from "./Header";
import { Prose } from "./Prose";
import { ArrowLeft } from "../Icons";
import { SocialShare } from "./SocialShare";
import { AboutAuthor } from "./AboutAuthor";
import { RelatedArticles } from "./RelatedArticles";
import { SidebarLinks } from "./SidebarLinks";

const meta = {
  title: "Pages/Article",
};
export default meta;

export const Base = {
  render: () => {
    return (
      <div>
        <Header
          title="A story of a freshman in Sydney"
          author="John Isaiah Smith"
          authorImage={avatarImage.src}
        ></Header>
        <div className="container mx-auto mt-4 w-full max-md:px-4 md:mt-20">
          <div className="flex justify-center md:-ml-64">
            <aside className="max-md:hidden">
              <SidebarLinks
                className="sticky top-4 ml-auto w-64"
                headings={[
                  { title: "The land of good vibes", id: "foo" },
                  { title: "The land of good vibes", id: "foo" },
                  { title: "The land of good vibes", id: "foo" },
                ]}
              />
            </aside>
            <main className="max-w-prose">
              <span className="mb-4 inline-flex items-center gap-2 text-sm max-md:mt-2">
                <ArrowLeft className="stroke-black" /> Back
              </span>
              <div className="flex flex-col gap-10 md:gap-14">
                <Prose>
                  <p className="lead">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    at nibh quis risus euismod feugiat non in augue. Proin
                    mollis sem tellus, quis iaculis purus congue ut. Etiam
                    tristique magna nisl, dignissim molestie erat condimentum
                    quis.
                  </p>
                  <img src={blogImage.src} className="w-full md:my-14" />
                  <h2>The land of good vibes only</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    at nibh quis risus euismod feugiat non in augue. Proin
                    mollis sem tellus, quis iaculis purus congue ut. Etiam
                    tristique magna nisl, dignissim molestie erat condimentum
                    quis. Proin in massa at est dignissim vulputate. Praesent
                    pretium libero tempor dui interdum, et iaculis sapien
                    iaculis.
                  </p>
                  <p>
                    Curabitur vel tincidunt orci, ut convallis tortor. Cras
                    iaculis, arcu vel finibus condimentum, odio leo ultrices
                    ipsum, quis euismod mi nunc in risus. Nunc risus turpis,
                    pretium condimentum eros bibendum, tincidunt convallis erat.
                    Proin eget massa at augue aliquam mollis. Sed consectetur
                    efficitur orci, eu rhoncus diam consequat et. Nullam feugiat
                    semper ullamcorper. Donec elementum nulla ut orci bibendum
                    faucibus. Nam et molestie metus, sit amet pretium libero.
                    Sed tincidunt scelerisque sapien, ac accumsan enim egestas
                    non.
                  </p>
                  <p>
                    Curabitur vulputate diam ante, tincidunt faucibus lectus
                    tristique id. Vivamus eu libero mollis, volutpat arcu et,
                    congue lorem. Pellentesque habitant morbi tristique senectus
                    et netus et malesuada fames ac turpis egestas. Etiam
                    sagittis risus vel tempor varius. Vivamus vehicula, arcu ut
                    pellentesque scelerisque, felis est consequat leo, a
                    convallis enim nibh at lectus. Nunc semper rutrum nulla ac
                    ultrices.
                  </p>
                  <h2>The visa process - dos and the definite don’ts</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    at nibh quis risus euismod feugiat non in augue. Proin
                    mollis sem tellus, quis iaculis purus congue ut. Etiam
                    tristique magna nisl, dignissim molestie erat condimentum
                    quis. Proin in massa at est dignissim vulputate. Praesent
                    pretium libero tempor dui interdum, et iaculis sapien
                    iaculis.
                  </p>
                  <h2>Getting around the campus</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    at nibh quis risus euismod feugiat non in augue. Proin
                    mollis sem tellus, quis iaculis purus congue ut. Etiam
                    tristique magna nisl, dignissim molestie erat condimentum
                    quis. Proin in massa at est dignissim vulputate. Praesent
                    pretium libero tempor dui interdum, et iaculis sapien
                    iaculis.
                  </p>
                </Prose>
                <SocialShare url="foo"></SocialShare>
                <AboutAuthor
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at nibh quis risus euismod feugiat non in augue. Proin mollis sem tellus, quis iaculis purus congue ut."
                  author="John Isaiah Smith"
                  authorImage={avatarImage.src}
                ></AboutAuthor>
                <RelatedArticles
                  articles={[{ image: "src", title: "src", url: "" }]}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  },
};
