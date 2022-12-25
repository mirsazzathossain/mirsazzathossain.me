import { server } from "config";
import { Article, Tag } from "contentlayer/generated";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "next-share";

export default function SocialShare({
  article,
}: {
  article: Article;
}): JSX.Element {
  const url = `${server}/articles/${article.slug}`;
  return (
    <div className="flex justify-center space-x-2">
      <div>
        <FacebookShareButton
          url={url}
          quote={article.title}
          hashtag={(article.tags as Tag[])[0].title}
          blankTarget={true}
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
      </div>
      <div>
        <TwitterShareButton
          url={url}
          title={article.title}
          hashtags={[
            (article.tags as Tag[]).map((tag) => tag.title).join(", "),
          ]}
          blankTarget={true}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
      </div>
      <div>
        <RedditShareButton url={url} title={article.title} blankTarget={true}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
      </div>
      <div>
        <LinkedinShareButton url={url} blankTarget={true}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </div>
      <div>
        <WhatsappShareButton url={url} title={article.title} blankTarget={true}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
      </div>
    </div>
  );
}
