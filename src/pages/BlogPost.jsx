import { useEffect, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User, Share2, ChevronUp, List } from "lucide-react";
import { getBlogPost, getRelatedPosts, getCategoryName, getArticleImages } from "../data/blogData";
import { SolarCalculator, RegionComparator, SolarQuiz, ImageGallery } from "../components/blog";
import Header from "../components/Header";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const relatedPosts = getRelatedPosts(slug);
  const [readProgress, setReadProgress] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadProgress(Math.min(progress, 100));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract headings for TOC
  useEffect(() => {
    if (post?.content) {
      const h2Regex = /^## (.+)$/gm;
      const matches = [...post.content.matchAll(h2Regex)];
      setHeadings(matches.map((m, i) => ({
        id: `heading-${i}`,
        text: m[1]
      })));
    }
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Generate Article Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Le Panneau Solaire",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lepanneausolaire.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://lepanneausolaire.com/blog/${post.id}`
    }
  };

  // Generate FAQ Schema if post has FAQ
  const faqSchema = post.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  } : null;

  // Get images for this article
  const articleImgs = post.images ? getArticleImages(post.images) : [];

  // Positions where to insert images (after which H2 index, 0-based)
  const imageInsertPositions = [1, 3, 5]; // After 2nd, 4th, 6th H2

  // Position where to insert interactive module (after which H2 index)
  const moduleInsertPosition = 2; // After 3rd H2

  // Parse tables properly
  const parseTable = (lines, startIndex) => {
    const tableLines = [];
    let i = startIndex;
    while (i < lines.length && lines[i].startsWith('|')) {
      tableLines.push(lines[i]);
      i++;
    }
    if (tableLines.length < 2) return null;

    const headerCells = tableLines[0].split('|').filter(c => c.trim());
    const bodyLines = tableLines.slice(2); // Skip header and separator

    return {
      header: headerCells.map(c => c.trim()),
      rows: bodyLines.map(line => line.split('|').filter(c => c.trim()).map(c => c.trim())),
      endIndex: i - 1
    };
  };

  // Render bold text in cells
  const renderCellContent = (text) => {
    const parts = text.split(/\*\*(.+?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-semibold text-gray-900">{part}</strong>;
      }
      return part;
    });
  };

  // Render markdown content with heading IDs, images and interactive modules
  const renderContent = (content) => {
    let headingIndex = 0;
    const lines = content.split('\n');
    const elements = [];
    let i = 0;
    let imageIndex = 0;

    while (i < lines.length) {
      const line = lines[i];

      // H2 Headers with ID for TOC
      if (line.startsWith('## ')) {
        const id = `heading-${headingIndex}`;
        elements.push(
          <h2 key={`h2-${i}`} id={id} className="text-2xl font-bold text-gray-900 mt-10 mb-6 scroll-mt-24">
            {line.replace('## ', '')}
          </h2>
        );

        // Insert image after specific H2s
        if (imageInsertPositions.includes(headingIndex) && articleImgs[imageIndex]) {
          const img = articleImgs[imageIndex];
          elements.push(
            <figure key={`img-${imageIndex}`} className="my-8">
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-[300px] object-cover rounded-xl shadow-lg"
              />
              {img.caption && (
                <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          );
          imageIndex++;
        }

        // Insert interactive module after specific H2
        if (headingIndex === moduleInsertPosition) {
          if (post.hasCalculator) {
            elements.push(<SolarCalculator key="calculator-mid" />);
          }
          if (post.hasRegionComparator) {
            elements.push(<RegionComparator key="region-mid" />);
          }
        }

        headingIndex++;
        i++;
        continue;
      }

      // H3 Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${i}`} className="text-xl font-bold text-gray-900 mt-8 mb-4">
            {line.replace('### ', '')}
          </h3>
        );
        i++;
        continue;
      }

      // Tables - parse entire table block
      if (line.startsWith('|')) {
        const table = parseTable(lines, i);
        if (table) {
          elements.push(
            <div key={`table-${i}`} className="overflow-x-auto my-8 flex justify-center">
              <table className="border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-50 to-yellow-50">
                    {table.header.map((cell, j) => (
                      <th key={j} className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900 whitespace-nowrap">
                        {renderCellContent(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="border border-gray-200 px-4 py-3 text-gray-700">
                          {renderCellContent(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          i = table.endIndex + 1;
          continue;
        }
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${i}`} className="border-l-4 border-orange-400 bg-orange-50 pl-4 py-3 my-6 italic text-gray-700 rounded-r-lg">
            {line.replace('> ', '')}
          </blockquote>
        );
        i++;
        continue;
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-8 border-gray-200" />);
        i++;
        continue;
      }

      // Lists with bold
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*\s*:?\s*(.*)/);
        if (match) {
          elements.push(
            <li key={`li-${i}`} className="mb-2 text-gray-700 font-light flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              <span><strong className="font-semibold text-gray-900">{match[1]}</strong>{match[2] && `: ${match[2]}`}</span>
            </li>
          );
          i++;
          continue;
        }
      }

      // Regular lists
      if (line.startsWith('- ')) {
        elements.push(
          <li key={`li-${i}`} className="mb-2 text-gray-700 font-light flex items-start">
            <span className="text-orange-500 mr-2">•</span>
            <span>{line.replace('- ', '')}</span>
          </li>
        );
        i++;
        continue;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const match = line.match(/^(\d+)\.\s(.+)/);
        if (match) {
          elements.push(
            <li key={`li-${i}`} className="mb-2 text-gray-700 font-light flex items-start">
              <span className="text-orange-500 font-semibold mr-3 min-w-[20px]">{match[1]}.</span>
              <span>{match[2]}</span>
            </li>
          );
          i++;
          continue;
        }
      }

      // Checkboxes
      if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
        const isChecked = line.startsWith('- [x]');
        elements.push(
          <li key={`check-${i}`} className="mb-2 text-gray-700 font-light flex items-center">
            <span className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
              {isChecked && '✓'}
            </span>
            <span>{line.replace(/- \[.\] /, '')}</span>
          </li>
        );
        i++;
        continue;
      }

      // Bold standalone
      if (line.startsWith('**') && line.endsWith('**')) {
        elements.push(
          <p key={`bold-${i}`} className="font-semibold text-gray-900 mt-4">
            {line.replace(/\*\*/g, '')}
          </p>
        );
        i++;
        continue;
      }

      // Paragraphs with inline formatting
      if (line.trim()) {
        const formatted = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        elements.push(
          <p key={`p-${i}`} className="text-gray-700 font-light leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      }

      i++;
    }

    return elements;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || `${post.title} | Le Panneau Solaire`}</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        <link rel="canonical" href={`https://lepanneausolaire.com/blog/${post.id}`} />
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <Header />

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-white">
        {/* Header avec retour */}
        <div className="bg-gray-900 py-4 border-b border-gray-800">
          <div className="container-page">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour au blog</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto">
              {/* Category */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  <Tag className="w-4 h-4" />
                  {getCategoryName(post.category)}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500 font-light">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de lecture
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Featured Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-page">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  {/* Table of Contents */}
                  {headings.length > 3 && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                      <button
                        onClick={() => setShowTOC(!showTOC)}
                        className="flex items-center justify-between w-full text-left"
                      >
                        <span className="flex items-center gap-2 font-semibold text-gray-900">
                          <List className="w-5 h-5" />
                          Sommaire
                        </span>
                        <ChevronUp className={`w-5 h-5 text-gray-500 transition-transform ${showTOC ? '' : 'rotate-180'}`} />
                      </button>
                      {showTOC && (
                        <nav className="mt-4 space-y-2">
                          {headings.map((heading, i) => (
                            <a
                              key={i}
                              href={`#${heading.id}`}
                              className="block text-gray-600 hover:text-orange-600 transition-colors text-sm py-1 pl-4 border-l-2 border-gray-200 hover:border-orange-500"
                            >
                              {heading.text}
                            </a>
                          ))}
                        </nav>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="prose prose-lg max-w-none">
                    {renderContent(post.content)}
                  </div>

                  {/* Quiz at the end if available */}
                  {post.hasQuiz && (
                    <SolarQuiz />
                  )}

                  {/* FAQ Section */}
                  {post.faq && post.faq.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Questions frequentes
                      </h2>
                      <div className="space-y-4">
                        {post.faq.map((item, i) => (
                          <details key={i} className="group bg-gray-50 rounded-xl p-6 cursor-pointer">
                            <summary className="flex items-center justify-between font-semibold text-gray-900 list-none">
                              {item.question}
                              <ChevronUp className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                            </summary>
                            <p className="mt-4 text-gray-700 font-light leading-relaxed">
                              {item.answer}
                            </p>
                          </details>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Box */}
                  <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Vous souhaitez passer au solaire ?
                    </h3>
                    <p className="text-gray-700 font-light mb-6">
                      Obtenez une etude personnalisee gratuite et sans engagement pour votre projet.
                    </p>
                    <Link
                      to="/#form"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      Demander mon etude gratuite
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <Share2 className="w-5 h-5" />
                        Partager
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        Copier le lien
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                      <>
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          Articles lies
                        </h4>
                        <div className="space-y-4 mb-8">
                          {relatedPosts.slice(0, 3).map(relatedPost => (
                            <Link
                              key={relatedPost.id}
                              to={`/blog/${relatedPost.id}`}
                              className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                            >
                              <span className="text-xs text-orange-600 font-semibold">
                                {getCategoryName(relatedPost.category)}
                              </span>
                              <h5 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2">
                                {relatedPost.title}
                              </h5>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}

                    {/* Mini CTA */}
                    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
                      <h4 className="font-bold mb-2">Etude gratuite</h4>
                      <p className="text-sm text-gray-300 font-light mb-4">
                        Calculez vos economies
                      </p>
                      <Link
                        to="/#form"
                        className="block text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-transform"
                      >
                        Demarrer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scroll to top button */}
        {readProgress > 20 && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors z-50"
            aria-label="Retour en haut"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </>
  );
}
