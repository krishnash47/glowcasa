"use client";


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Shield, Leaf, Award, Star, Calculator } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getFeaturedProducts, getCategories } from "@/lib/products";
type RoomType =
  | "Bedroom"
  | "Living Room"
  | "Kitchen"
  | "Office"
  | "Balcony & Outdoor"
  | "Factory";

type CalcResult = {
  area: string;
  lumens: number;
  watts: string;
  suggestion: string;
};

export default function HomePage() 
{
  const featuredProducts = getFeaturedProducts(4);
  const categories = getCategories();

  // Calculator state
 const [calc, setCalc] = useState<{
  roomType: RoomType;
  unit: string;
  width: string;
  length: string;
  intensity: string;
  wallColor: string;
}>({
  roomType: "Bedroom",
  unit: "feet",
  width: "",
  length: "",
  intensity: "medium",
  wallColor: "light",
});

const [result, setResult] = useState<CalcResult | null>(null);

  const calculate = () => {
    const { width, length, unit, intensity, wallColor, roomType } = calc;

    if (!width || !length) return alert("Enter valid dimensions");

    let w = parseFloat(width);
    let l = parseFloat(length);

    if (unit === "meters") {
      w *= 3.28084;
      l *= 3.28084;
    }

    const area = w * l;
    const lumenRate = intensity === "low" ? 10 : intensity === "medium" ? 20 : 35;

    let lumens = area * lumenRate;
    if (wallColor === "dark") lumens *= 1.2;

    const watts = lumens / 100;

    const suggestions = {
      Bedroom: "Use COB, Panel, Rope light, Strip light, Spot lights.",
      "Living Room": "Use COB, Panel, Concealed, Tiltable Cylinder.",
      Kitchen: "Use Panel light, Strip light, Spot light.",
      Office: "Use 2×2 Panel, Track Light.",
      "Balcony & Outdoor": "Use Up-Down, Spike, Deep Junction.",
      Factory: "Use High Bay, Flood Light, Street Light.",
    };

    setResult({
      area: area.toFixed(2),
      lumens: Math.round(lumens),
      watts: watts.toFixed(1),
      suggestion: suggestions[roomType],
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-background via-muted/30 to-card">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Leading Lighting Solutions
                </Badge>
                <h1 className="text-4xl font-bold tracking-tight text-balance lg:text-6xl">
                  Brighter And Affordable <span className="text-primary">Lighting Solution</span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty">
                  Welcome to GlowCasa Lighting, a leading name in innovative and energy-efficient lighting solutions. We design and deliver high-performance LED products that bring brilliance, comfort, and style to every space — from homes and offices to commercial and industrial environments. With a strong dealer and distributor network across India, we are committed to illuminating lives with cutting-edge technology, reliable performance, and elegant design.
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
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Dealer Distributor Network</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] lg:h-[600px]">
                <Image
                  src="/home.jpg"
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
            <h2 className="text-3xl font-bold text-balance">Why Choose GlowCasa?</h2>
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
      {/* Lumens Calculator Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center space-y-4 mb-10">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-balance">GlowCasa Lumen & Watt Calculator</h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Calculate the perfect lighting requirements for your space with our advanced calculator.
            </p>
          </div>

          <Card className="p-6 shadow-lg border-primary/30">
            <div className="grid grid-cols-1 gap-6">
              {/* Room Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Room Type</label>
                <select
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.roomType}
                  onChange={(e) => setCalc({...calc,roomType: e.target.value as RoomType})}

                >
                  <option>Bedroom</option>
                  <option>Living Room</option>
                  <option>Kitchen</option>
                  <option>Office</option>
                </select>
              </div>

              {/* Unit */}
              <div>
                <label className="block text-sm font-medium mb-2">Measurement Unit</label>
                <select
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.unit}
                  onChange={(e) => setCalc({ ...calc, unit: e.target.value })}
                >
                  <option value="feet">Feet</option>
                  <option value="meters">Meters</option>
                </select>
              </div>

              {/* Room Width */}
              <div>
                <label className="block text-sm font-medium mb-2">Room Width</label>
                <input
                  type="number"
                  placeholder={`Enter width in ${calc.unit}`}  //  to show why do it work as fast as we like it to work and that will help me to grow an be rich as much as i want
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.width}
                  onChange={(e) => setCalc({ ...calc, width: e.target.value })}
                />
              </div>

              {/* Room Length */}
              <div>
                <label className="block text-sm font-medium mb-2">Room Length</label>
                <input
                  type="number"
                  placeholder={`Enter length in ${calc.unit}`}
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.length}
                  onChange={(e) => setCalc({ ...calc, length: e.target.value })}
                />
              </div>

              {/* Intensity */}
              <div>
                <label className="block text-sm font-medium mb-2">Light Intensity</label>
                <select
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.intensity}
                  onChange={(e) => setCalc({ ...calc, intensity: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Wall Color */}
              <div>
                <label className="block text-sm font-medium mb-2">Wall Color</label>
                <select
                  className="w-full p-3 border rounded-md bg-background"
                  value={calc.wallColor}
                  onChange={(e) => setCalc({ ...calc, wallColor: e.target.value })}
                >
                  <option value="light">Light Walls</option>
                  <option value="dark">Dark Walls</option>
                </select>
              </div>

              <Button className="w-full py-6 text-lg" onClick={calculate}>
                Calculate Lighting Requirements
              </Button>

              {result && (
                <div className="p-6 bg-primary/10 border-l-4 border-primary rounded-lg mt-4">
                  <h3 className="text-lg font-bold mb-4 text-primary">Your Lighting Requirements:</h3>
                  <div className="space-y-3">
                    <p className="flex justify-between">
                      <span className="font-medium">Room Area:</span>
                      <span className="font-bold">{result.area} sq ft</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Total Lumens:</span>
                      <span className="font-bold">{result.lumens} lm</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-medium">Recommended Wattage:</span>
                      <span className="font-bold">{result.watts} W</span>
                    </p>
                    <div className="pt-3 border-t">
                      <p className="font-medium mb-2">Product Suggestion:</p>
                      <p className="text-sm text-muted-foreground">{result.suggestion}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
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
              return (
                <Card key={category.id} className="group hover:shadow-lg transition-shadow">
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
              );
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
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}