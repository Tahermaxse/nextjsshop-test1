"use client";
import { MoreHorizontal, Camera, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import toast from "react-hot-toast";

const navigationItems = [
  { name: "Notifications", path: "/profile" },
  { name: "Purchases", path: "/profile/purchases" },
  { name: "Report", path: "/profile/report" },
  {name: "Quota Request",path:"/profile/quotarequest"},
  { name: "Settings", path: "/profile/settings" },
];

// Define validation schema
const profileSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Name can only contain letters, numbers, spaces, hyphens and underscores"),
});

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status, update: updateSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(session?.user?.name || "");
  const [currentImage, setCurrentImage] = useState(session?.user?.image || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      signOut();
    }
  }, [status]);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
    if (session?.user?.image) {
      setCurrentImage(session.user.image);
    }
  }, [session?.user?.name, session?.user?.image]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const validateName = (value: string) => {
    try {
      profileSchema.shape.name.parse(value);
      setNameError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNameError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file size and type
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only .jpg, .png, .gif and .webp formats are supported");
      return;
    }
    
    // Prevent multiple simultaneous updates
    if (isUpdating) return;
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const data = await response.json();
      
      // Update local state
      setCurrentImage(data.user.image);
      
      // Update session with new data
      await updateSession({
        user: {
          ...session?.user,
          image: data.user.image
        }
      });
      
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update profile picture");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleNameUpdate = async () => {
    if (isUpdating) return;
    
    // Validate name before updating
    if (!validateName(name)) {
      return;
    }

    setIsUpdating(true);

    try {
      const formData = new FormData();
      formData.append("name", name);

      const response = await fetch("/api/profile", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      const data = await response.json();
      
      // Update session with new data
      await updateSession({
        user: {
          ...session?.user,
          name: data.user.name
        }
      });
      
      setIsEditing(false);
      toast.success("Name updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update name");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="container max-w-[1200px] mx-auto px-4 pt-8 md:pt-12">
        <div className="flex flex-col gap-6">
          {/* Profile Info */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="relative group h-20 w-20">
              <Avatar className="h-20 w-20 text-2xl border-2 border-background cursor-pointer" onClick={handleImageClick}>
                <AvatarImage
                  src={currentImage || "/default-avatar.png"}
                  alt={session?.user?.name || "User"}
                />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <Button
                variant="secondary"
                size="icon"
                className="absolute inset-0 m-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleImageClick}
                style={{ pointerEvents: "auto" }}
              >
                <Camera className="h-4 w-4" />
              </Button>
              {currentImage && currentImage !== "/default-avatar.png" && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={async () => {
                    if (isUpdating) return;
                    setIsUpdating(true);
                    try {
                      const formData = new FormData();
                      formData.append("removeImage", "true");
                      formData.append("name", name);

                      const response = await fetch("/api/profile", {
                        method: "PUT",
                        body: formData,
                      });

                      if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.error || "Failed to remove profile picture");
                      }

                      const data = await response.json();
                      setCurrentImage("");
                      await updateSession({
                        user: {
                          ...session?.user,
                          image: "",
                        },
                      });
                      toast.success("Profile picture removed!");
                    } catch (error) {
                      toast.error(error instanceof Error ? error.message : "Failed to remove profile picture");
                    } finally {
                      setIsUpdating(false);
                    }
                  }}
                  disabled={isUpdating}
                  title="Remove profile picture"
                  style={{ pointerEvents: "auto" }}
                >
                  <span className="sr-only">Remove</span>
                  <X className="h-4 w-4" />
                </Button>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                disabled={isUpdating}
              />
            </div>
            <div className="space-y-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <div className="space-y-1">
                    <Input
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        validateName(e.target.value);
                      }}
                      className={`max-w-[200px] ${nameError ? 'border-red-500' : ''}`}
                      disabled={isUpdating}
                    />
                    {nameError && (
                      <p className="text-xs text-red-500">{nameError}</p>
                    )}
                  </div>
                  <Button onClick={handleNameUpdate} variant="fancy" disabled={isUpdating || !!nameError}>
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setIsEditing(false);
                    setNameError(null);
                    setName(session?.user?.name || "");
                  }} disabled={isUpdating}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <h1
                  className="text-2xl font-bold cursor-pointer hover:text-primary"
                  onClick={() => setIsEditing(true)}
                >
                  {session?.user?.name || "User"}
                </h1>
              )}
              <p className="text-muted-foreground">
                {session?.user?.email || "example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 border-b overflow-x-auto scrollbar-none">
          <nav className="min-w-full inline-block whitespace-nowrap">
            <ul className="flex gap-8 pb-px">
              {navigationItems.map((item) => (
                <li key={item.name} className="inline-block flex-shrink-0">
                  <Link
                    href={item.path}
                    className={`inline-block pb-4 hover:text-foreground whitespace-nowrap ${
                      pathname === item.path
                        ? "border-b-2 border-foreground text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-[1200px] mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}