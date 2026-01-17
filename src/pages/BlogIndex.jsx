import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Calendar, Clock, ArrowRight, Tag, Search, X } from "lucide-react";
import { blogPosts, getAllCategories, getCategoryName } from "../data/blogData";
import Header from "../components/Header";
import FooterEnrichi from "../sections/FooterLegal";

export default function BlogIndex() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const categories = getAllCategories();

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = [...blogPosts];

    // Filter by category
    if (selectedCategory !== "all") {
      posts = posts.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [selectedCategory, searchQuery]);

  // Get featured post (most recent)
  const featuredPost = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  // Blog list schema
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog Le Panneau Solaire",
    "description": "Guides, conseils et actualites sur les panneaux solaires, l'autoconsommation et les energies renouvelables en France.",
    "url": "https://lepanneausolaire.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Le Panneau Solaire",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lepanneausolaire.com/logo.png"
      }
    },
    "blogPost": blogPosts.slice(0, 10).map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://lepanneausolaire.com/blog/${post.id}`
    }))
  };

  const categoryColors = {
    "guide-pratique": "bg-blue-100 text-blue-700 hover:bg-blue-200",
    "prix-financement": "bg-green-100 text-green-700 hover:bg-green-200",
    "technique": "bg-purple-100 text-purple-700 hover:bg-purple-200",
    "rentabilite": "bg-orange-100 text-orange-700 hover:bg-orange-200",
    "aides-subventions": "bg-teal-100 text-teal-700 hover:bg-teal-200",
    "regional": "bg-red-100 text-red-700 hover:bg-red-200"
  };

  return (
    <>
      <Helmet>
        <title>Blog Panneaux Solaires : Guides, Prix et Conseils | Le Panneau Solaire</title>
        <meta name="description" content="Decouvrez nos guides complets sur les panneaux solaires : prix, aides, rentabilite, installation. Conseils d'experts pour reussir votre projet solaire." />
        <meta property="og:title" content="Blog Panneaux Solaires | Le Panneau Solaire" />
        <meta property="og:description" content="Guides, conseils et actualites sur les panneaux solaires et l'autoconsommation en France." />
        <link rel="canonical" href="https://lepanneausolaire.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify(blogSchema)}
        </script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
          <div className="container-page">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Blog Panneaux Solaires
              </h1>
              <p className="text-xl text-gray-300 font-light">
                Guides complets, conseils d'experts et actualites pour reussir votre projet solaire.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && selectedCategory === "all" && !searchQuery && (
          <section className="container-page -mt-8">
            <Link
              to={`/blog/${featuredPost.id}`}
              className="block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      A la une
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${categoryColors[featuredPost.category] || 'bg-gray-100 text-gray-700'}`}>
                      {getCategoryName(featuredPost.category)}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 font-light mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Filters */}
        <section className="container-page py-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === "all"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                Tous
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    selectedCategory === category.id
                      ? "bg-gray-900 text-white"
                      : `${categoryColors[category.id] || 'bg-white text-gray-700 hover:bg-gray-100'} border border-transparent`
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} trouve{filteredPosts.length > 1 ? 's' : ''}
            {selectedCategory !== "all" && ` dans "${getCategoryName(selectedCategory)}"`}
            {searchQuery && ` pour "${searchQuery}"`}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="container-page pb-16">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className={`group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 ${
                    index === 0 && selectedCategory === "all" && !searchQuery ? 'hidden' : ''
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}>
                        {getCategoryName(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-light text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucun article trouve
              </h3>
              <p className="text-gray-600 font-light mb-4">
                Essayez de modifier vos criteres de recherche
              </p>
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="text-orange-600 font-semibold hover:text-orange-700"
              >
                Voir tous les articles
              </button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16">
          <div className="container-page text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pret a passer au solaire ?
            </h2>
            <p className="text-gray-700 font-light mb-8 max-w-2xl mx-auto">
              Obtenez une etude personnalisee gratuite et decouvrez combien vous pouvez economiser avec des panneaux solaires.
            </p>
            <Link
              to="/#form"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Demander mon etude gratuite
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      <FooterEnrichi />
    </>
  );
}
