import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Leaf, Award, Star } from "lucide-react"
import { getFeaturedProducts, getCategories } from "@/lib/products"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(4)
  const categories = getCategories()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/30 to-card">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Leading Lighting Solutions
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-6xl">
                  Illuminate Your World with <span className="text-primary">Smart Lighting</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Discover our comprehensive range of energy-efficient LED lights, smart lighting systems, and
                  industrial solutions designed to brighten every space with innovation and sustainability.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/products">
                    Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get Consultation</Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] lg:h-[600px]">
                <Image
                  src="https://res.cloudinary.com/dzdyydnkj/image/upload/v1763017661/modern-led-lighting-installation-in-office-space_m1mimz.jpg"
                  alt="Modern LED lighting installation"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-balance">Why Choose glowcasa?</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              We deliver cutting-edge lighting solutions that combine innovation, efficiency, and sustainability.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Energy Efficient</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Up to 80% energy savings with our advanced LED technology and smart controls.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Reliable Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Premium components and rigorous testing ensure long-lasting performance and durability.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sustainable lighting solutions that reduce carbon footprint and environmental impact.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Expert Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional consultation and technical support from our experienced lighting specialists.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-balance">Our Product Categories</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Comprehensive lighting solutions for every application and environment.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              return <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                    
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{category.description}</CardDescription>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/products?category=${category.id}`}>
                      View Products <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
})}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-balance">Featured Products</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Discover our most popular and innovative lighting solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2 mb-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">₹{product.price}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm text-muted-foreground">4.8</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-balance">Ready to Transform Your Space?</h2>
            <p className="text-xl text-primary-foreground/90 text-pretty">
              Get expert consultation and custom lighting solutions tailored to your specific needs. Our team is ready
              to help you create the perfect lighting environment.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/products">Browse Catalog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
