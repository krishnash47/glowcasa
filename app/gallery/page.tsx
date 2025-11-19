"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryItem {
  type: "image" | "video"
  src: string
  thumbnail?: string // Optional thumbnail for videos
}

const galleryItems: GalleryItem[] = [
  // Company Photos
 {
    type: "video",
    src: "https://res.cloudinary.com/dzdyydnkj/video/upload/v1763022358/Glowcasa_ecakgk.mp4",
  },
  {
    type: "image",
    src: "/event.jpeg",
  },
]

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  const droneVideo = galleryItems.find((item) => item.type === "video")
  const companyPhotos = galleryItems.filter((item) => item.type === "image")

  const MediaThumbnail = ({ item }: { item: GalleryItem }) => (
    <div
      className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer h-64 md:h-72"
      onClick={() => openModal(item)}
    >
      {item.type === "image" ? (
        <Image
          src={item.src || "/placeholder.svg"}
          alt="Gallery item"
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <>
            <video
              src={item.src}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              muted
              loop
            />
        </>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Drone Video Featured Section */}
      {droneVideo && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div
              className="group relative overflow-hidden rounded-lg bg-muted cursor-pointer h-96 md:h-[500px]"
              onClick={() => openModal(droneVideo)}
            >
              {droneVideo.thumbnail ? (
                <Image
                  src={droneVideo.thumbnail}
                  alt="Drone video"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <video
                  src={droneVideo.src}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  muted
                  loop
                  autoPlay
                />
              )}
              
            </div>
          </div>
        </section>
      )}

      {/* Company Photos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {companyPhotos.map((item, index) => (
              <MediaThumbnail key={index} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            <div className="relative w-full bg-black rounded-lg overflow-hidden">
              {selectedItem.type === "image" ? (
                <div className="relative w-full h-auto max-h-[80vh]">
                  <Image
                    src={selectedItem.src || "/placeholder.svg"}
                    alt="Gallery item"
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <video 
                  src={selectedItem.src} 
                  autoPlay 
                  muted 
                  loop
                  className="w-full h-auto max-h-[80vh] object-contain" 
                />
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}