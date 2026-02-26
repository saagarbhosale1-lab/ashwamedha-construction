import os
from PIL import Image

def optimize_construction_photos(directory, quality=80):
    if not os.path.exists(directory):
        print(f"Directory '{directory}' not found.")
        return

    # Create an output folder
    output_folder = os.path.join(directory, "optimized_webp")
    os.makedirs(output_folder, exist_ok=True)

    optimized_count = 0
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            img_path = os.path.join(directory, filename)
            try:
                img = Image.open(img_path)

                # Resize if wider than 1920px (standard HD)
                if img.width > 1920:
                    aspect_ratio = img.height / img.width
                    img = img.resize((1920, int(1920 * aspect_ratio)), Image.Resampling.LANCZOS)

                # Save as WebP
                base_name = os.path.splitext(filename)[0]
                save_path = os.path.join(output_folder, f"{base_name}.webp")
                
                # Convert RGBA to RGB if saving as WebP without alpha
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                    
                img.save(save_path, "WEBP", quality=quality)
                print(f"Optimized: {filename} -> {base_name}.webp")
                optimized_count += 1
            except Exception as e:
                print(f"Failed to process {filename}: {e}")

    print(f"\nOptimization complete! {optimized_count} images saved to {output_folder}")

if __name__ == "__main__":
    # Usage: Point this to your project photos folder
    target_dir = input("Enter the path to your raw photos directory (e.g., ./raw_images): ")
    if target_dir.strip():
        optimize_construction_photos(target_dir.strip())
