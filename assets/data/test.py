import fitz
from pypdf import PdfReader, PdfWriter

# Define the input and output PDF file paths
input_pdf_path = 'CNEOF2023-3.pdf'    # Replace with your actual input PDF file path
removed_pdf_path = 'CNEOF2023-3-removed.pdf'  # Replace with your desired output PDF file path
modified_pdf_path = 'CNEOF2023-3-modified.pdf'  # Replace with your desired output PDF file path

pages_to_remove = [3, 4, 5, 6]

# Convert to 0-based indices and sort in reverse order
pages_to_remove = sorted([p - 1 for p in pages_to_remove], reverse=True)

reader = PdfReader(input_pdf_path)
writer = PdfWriter()

# Append all pages to the writer
writer.append_pages_from_reader(reader)

# Remove pages by index
for page_index in pages_to_remove:
    writer.remove_page(page_index)

# Write the modified PDF to a new file
with open(removed_pdf_path, 'wb') as output_pdf_file:
    writer.write(output_pdf_file)

# Open the PDF document
doc = fitz.open(removed_pdf_path)

# Text to search and replace
search_text = '4.2.Iconographie recommandée au deuxième trimestre'
replace_text = 'Iconographie recommandée au deuxième trimestre'

# Iterate over each page
for page_num, page in enumerate(doc):
    # Search for instances of the search text
    text_instances = page.search_for(search_text)

    # Iterate over each instance
    for inst in text_instances:
        # Redact the area covering the search text
        # The fill parameter defines the color to fill the redacted area (white in this case)
        page.add_redact_annot(inst, fill=(1, 1, 1))
    
    # Apply the redactions to remove the old text
    page.apply_redactions()

    # Insert the new text at the position of the old text
    for inst in text_instances:
        # Define the position to insert the new text
        x0, y0, x1, y1 = inst
        rect = fitz.Rect(x0 - 24, y0 + 10, x1, y1)
        
        # Adjust font size and other parameters as needed
        page.insert_text(
            rect.tl,  # Top-left corner of the rectangle
            replace_text,
            fontsize=12,  # Adjust the font size to match your document
            color=(0, 0, 0),  # Text color (black)
            fontname="helvetica-bold",  # You can change the font as needed
        )


# Text to search and replace
search_text = 'Iconographie complémentaire'
replace_text = 'Iconographie complémentaire au deuxième trimestre'

# Iterate over each page
for page_num, page in enumerate(doc):
    # Search for instances of the search text
    text_instances = page.search_for(search_text)

    # Iterate over each instance
    for inst in text_instances:
        # Redact the area covering the search text
        # The fill parameter defines the color to fill the redacted area (white in this case)
        page.add_redact_annot(inst, fill=(1, 1, 1))
    
    # Apply the redactions to remove the old text
    page.apply_redactions()

    # Insert the new text at the position of the old text
    for inst in text_instances:
        # Define the position to insert the new text
        x0, y0, x1, y1 = inst
        rect = fitz.Rect(x0, y0 + 10, x1, y1)
        
        # Adjust font size and other parameters as needed
        page.insert_text(
            rect.tl,  # Top-left corner of the rectangle
            replace_text,
            fontsize=12,  # Adjust the font size to match your document
            color=(0, 0, 0),  # Text color (black)
            fontname="helvetica-bold",  # You can change the font as needed
        )

# Text to search and remove
search_text = 'Page sur 156 181'

# Iterate over each page
for page_num, page in enumerate(doc):
    # Search for instances of the search text on the page
    text_instances = page.search_for(search_text)

    # Iterate over each instance
    for inst in text_instances:
        # Add a redaction annotation over the text area
        # The fill parameter defines the color to fill the redacted area (white in this case)
        page.add_redact_annot(inst, fill=(1, 1, 1))

    # Apply the redactions to remove the text
    page.apply_redactions()

# Text to search and remove
search_text = 'Page sur 157 181'

# Iterate over each page
for page_num, page in enumerate(doc):
    # Search for instances of the search text on the page
    text_instances = page.search_for(search_text)

    # Iterate over each instance
    for inst in text_instances:
        # Add a redaction annotation over the text area
        # The fill parameter defines the color to fill the redacted area (white in this case)
        page.add_redact_annot(inst, fill=(1, 1, 1))

    # Apply the redactions to remove the text
    page.apply_redactions()

# Text to search and remove
search_text = 'Page sur 162 181'

# Iterate over each page
for page_num, page in enumerate(doc):
    # Search for instances of the search text on the page
    text_instances = page.search_for(search_text)

    # Iterate over each instance
    for inst in text_instances:
        # Add a redaction annotation over the text area
        # The fill parameter defines the color to fill the redacted area (white in this case)
        page.add_redact_annot(inst, fill=(1, 1, 1))

    # Apply the redactions to remove the text
    page.apply_redactions()

# Save the modified PDF
doc.save(modified_pdf_path)
doc.close()
