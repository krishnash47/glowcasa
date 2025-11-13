"use client"

import { notFound } from "next/navigation"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Zap, Shield, Award } from "lucide-react"
import { getProductById, getProducts, getCategories } from "@/lib/products"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product: any = getProductById(params.id)
  const allProducts = getProducts()
  const categories = getCategories()

  // State for selected variant
  const [selectedVariant, setSelectedVariant] = useState(0)

  if (!product) {
    notFound()
  }

  // Check if product has variants
  const hasVariants = product.variants && product.variants.length > 0
  
  // Get current price and specifications based on variant selection
  const currentPrice = hasVariants ? product.variants[selectedVariant].price : product.price
  const currentSpecs = hasVariants ? product.variants[selectedVariant].specifications : product.specifications

  const category = categories.find((cat) => cat.id === product.category)
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
              {category?.name}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-96 lg:h-[500px] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div className="space-y-4">
                
                <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
                <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
                <div className="text-3xl font-bold text-primary">₹{currentPrice}</div>
              </div>

              {/* Variant Selection */}
              {hasVariants && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Power:</label>
                  <Select
                    value={selectedVariant.toString()}
                    onValueChange={(value) => setSelectedVariant(parseInt(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select power option" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant: any, index: any) => (
                        <SelectItem key={variant.id} value={index.toString()}>
                          {variant.power} - ₹{variant.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Key Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Key Features</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature: any, index: any) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/contact">Request Quote</Link>
                </Button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Energy Efficient</div>
                  <div className="text-xs text-muted-foreground">Up to 80% savings</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">5 Year Warranty</div>
                  <div className="text-xs text-muted-foreground">Full coverage</div>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-sm font-medium">Certified Quality</div>
                  <div className="text-xs text-muted-foreground">CE & RoHS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>
                    Detailed technical information about this product
                    {hasVariants && ` (${product.variants[selectedVariant].power})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(currentSpecs).map(([key, value]: any) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="installation" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Installation Guide</CardTitle>
                  <CardDescription>Step-by-step installation instructions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Before You Begin</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Turn off power at the circuit breaker</li>
                      <li>• Gather necessary tools and equipment</li>
                      <li>• Read all safety instructions</li>
                      <li>• Check local electrical codes</li>
                    </ul>
                  </div>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="font-semibold">Installation Steps</h4>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Remove existing fixture (if applicable)</li>
                      <li>2. Install mounting bracket securely</li>
                      <li>3. Connect wiring according to diagram</li>
                      <li>4. Attach fixture to mounting bracket</li>
                      <li>5. Test installation and restore power</li>
                    </ol>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Professional Installation Recommended:</strong> For safety and warranty compliance, we
                      recommend having this product installed by a qualified electrician.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-balance">Related Products</h2>
                <p className="text-lg text-muted-foreground text-pretty">Other products you might be interested in</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-2 mb-4">
                        <CardTitle className="text-lg">{relatedProduct.name}</CardTitle>
                        <CardDescription className="line-clamp-2">{relatedProduct.description}</CardDescription>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-xl font-bold text-primary">
                          ₹{relatedProduct.variants ? relatedProduct.variants[0].price : relatedProduct.price}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm text-muted-foreground">4.8</span>
                        </div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/products/${relatedProduct.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Products */}
      <section className="py-8 border-t">
        <div className="container mx-auto px-4">
          <Button variant="outline" asChild>
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}