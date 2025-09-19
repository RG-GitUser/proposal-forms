// PDF Export Functionality - Event listener moved to fallback function below

async function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Show loading state
    const exportBtn = document.getElementById('exportPdf');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = 'Generating PDF...';
    exportBtn.disabled = true;
    
    try {
        // Get the container element
        const container = document.querySelector('.container');
        
        // Temporarily hide the export button for cleaner PDF
        const exportSection = document.querySelector('.export-section');
        const originalDisplay = exportSection.style.display;
        exportSection.style.display = 'none';
        
        // Use html2canvas to convert the HTML to canvas
        const canvas = await html2canvas(container, {
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            logging: false,
            width: container.scrollWidth,
            height: container.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            windowWidth: container.scrollWidth,
            windowHeight: container.scrollHeight
        });
        
        // Restore export button
        exportSection.style.display = originalDisplay;
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        
        // Convert canvas to image
        const imgData = canvas.toDataURL('image/png', 1.0);
        
        // Add the image to PDF
        let position = 0;
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add new pages if content is longer than one page
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Save the PDF
        const fileName = `Employee_Administration_System_Proposal_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        
        // Show success message
        showNotification('PDF exported successfully!', 'success');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        showNotification('Error generating PDF. Please try again.', 'error');
    } finally {
        // Reset button state
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add print functionality
function printProposal() {
    window.print();
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printProposal();
    }
    
    // Ctrl/Cmd + E for export PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportToPDF();
    }
});

// Add loading states and error handling
function addLoadingState(element) {
    element.style.opacity = '0.6';
    element.style.pointerEvents = 'none';
}

function removeLoadingState(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// Enhanced PDF export with better formatting
async function exportToPDFEnhanced() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Set up fonts and styling
    pdf.setFont('helvetica');
    
    // Add header
    pdf.setFillColor(6, 95, 70); // #065f46
    pdf.rect(0, 0, 210, 30, 'F');
    
    // Add title
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('SOFTWARE SOLUTIONS', 20, 15);
    
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Employee Administration System Proposal', 20, 22);
    
    // Reset text color
    pdf.setTextColor(0, 0, 0);
    
    // Add content sections
    let yPosition = 40;
    const pageHeight = 280;
    const margin = 20;
    
    // Executive Summary
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Executive Summary', margin, yPosition);
    yPosition += 10;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const summaryText = "Wabanaki Software Solutions is pleased to present this proposal for a comprehensive Employee Administration System designed specifically for businesses with under 100 employees. Our custom-built solution combines modern web technologies with user-friendly design, providing your organization with a centralized platform for managing employee data, departmental workflows, and administrative processes.";
    
    const summaryLines = pdf.splitTextToSize(summaryText, 170);
    pdf.text(summaryLines, margin, yPosition);
    yPosition += summaryLines.length * 4 + 10;
    
    // Investment highlights
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Investment Highlights:', margin, yPosition);
    yPosition += 8;
    
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text('• Investment: $15,000 (one-time development fee)', margin, yPosition);
    yPosition += 5;
    pdf.text('• Timeline: 8-12 weeks from project initiation', margin, yPosition);
    yPosition += 5;
    pdf.text('• Target: Businesses with 50-100 employees', margin, yPosition);
    yPosition += 15;
    
    // Check if we need a new page
    if (yPosition > pageHeight) {
        pdf.addPage();
        yPosition = 20;
    }
    
    // Core Components
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('What You Get for $15,000', margin, yPosition);
    yPosition += 10;
    
    const components = [
        {
            title: '1. Employee Database Management - $4,000',
            features: [
                'Complete employee profiles with personal and professional information',
                'Department and role assignment capabilities',
                'Employee status tracking (active, inactive, on leave)',
                'Search and filtering functionality',
                'Data import/export capabilities'
            ]
        },
        {
            title: '2. Departmental Templates - $3,500',
            features: [
                'Pre-built HR workflow templates',
                'Payroll processing templates',
                'Scheduling and time-off management',
                'Performance review templates',
                'Customizable forms for each department'
            ]
        },
        {
            title: '3. User Authentication & Role Management - $2,500',
            features: [
                'Multi-level access control (Admin, Manager, Employee)',
                'Secure login system with password requirements',
                'Role-based permissions and data access',
                'Optional two-factor authentication (add-on)'
            ]
        },
        {
            title: '4. Application Hosting & Setup - $2,000',
            features: [
                'Professional web hosting setup',
                'SSL certificate for secure data transmission',
                'Regular data backups',
                'Domain setup and configuration',
                'Basic monitoring and maintenance'
            ]
        },
        {
            title: '5. Reporting & Analytics Dashboard - $2,000',
            features: [
                'Employee summary reports',
                'Department performance metrics',
                'Attendance and leave tracking',
                'Custom report generation',
                'Data visualization tools'
            ]
        },
        {
            title: '6. Training & Documentation - $1,000',
            features: [
                'Comprehensive user manuals',
                'Video training tutorials',
                'On-site or remote training sessions',
                'Administrator setup guide',
                'Ongoing support documentation'
            ]
        }
    ];
    
    components.forEach(component => {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = 20;
        }
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text(component.title, margin, yPosition);
        yPosition += 6;
        
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        component.features.forEach(feature => {
            pdf.text('• ' + feature, margin + 5, yPosition);
            yPosition += 4;
        });
        yPosition += 5;
    });
    
    // Add footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text('Generated by Wabanaki Software Solutions', margin, 290);
    pdf.text(new Date().toLocaleDateString(), 150, 290);
    
    // Save the PDF
    const fileName = `Employee_Administration_System_Proposal_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);
    
    showNotification('PDF exported successfully!', 'success');
}

// Enhanced PDF export as fallback
async function exportToPDFWithFallback() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Show loading state
    const exportBtn = document.getElementById('exportPdf');
    const originalText = exportBtn.textContent;
    exportBtn.textContent = 'Generating PDF...';
    exportBtn.disabled = true;
    
    try {
        // Try html2canvas first
        if (window.html2canvas) {
            await exportToPDF();
            return;
        }
        
        // Fallback to enhanced text-based PDF
        await exportToPDFEnhanced();
        
    } catch (error) {
        console.error('Error with html2canvas, trying enhanced PDF:', error);
        try {
            await exportToPDFEnhanced();
        } catch (fallbackError) {
            console.error('Both PDF methods failed:', fallbackError);
            showNotification('Error generating PDF. Please try again.', 'error');
        }
    } finally {
        // Reset button state
        exportBtn.textContent = originalText;
        exportBtn.disabled = false;
    }
}

// Update the event listener to use the fallback method
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportPdf');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToPDFWithFallback);
    }
});

// Fallback for older browsers
if (!window.html2canvas) {
    console.warn('html2canvas not loaded, using enhanced PDF export');
}
