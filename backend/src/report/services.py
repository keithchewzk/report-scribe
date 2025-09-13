from src.report.schemas import ReportRequest


class ReportService:
    """Service class for handling report generation logic"""

    def generate_mock_report(self, request: ReportRequest) -> str:
        """Generate a mock student report based on the provided data"""

        # Determine pronouns based on gender
        pronoun = "he" if request.gender == "Male" else "she"
        possessive = "his" if request.gender == "Male" else "her"

        # Start building the report
        report = f"Student Report for {request.name}\n\n"

        # Add positive attributes section
        if request.positive_attributes:
            report += f"{request.name} has demonstrated several commendable qualities this term. "

            # Use first few attributes in a sentence
            if len(request.positive_attributes) >= 3:
                first_three = request.positive_attributes[:3]
                report += f"Particularly noteworthy is how {pronoun} {', '.join(first_three).lower()}. "
            elif len(request.positive_attributes) == 2:
                report += f"Particularly noteworthy is how {pronoun} {' and '.join(request.positive_attributes).lower()}. "
            else:
                report += f"Particularly noteworthy is how {pronoun} {request.positive_attributes[0].lower()}. "

            # Add remaining attributes if there are more
            if len(request.positive_attributes) > 3:
                remaining = request.positive_attributes[3:]
                report += (
                    f"Additionally, {request.name} {', '.join(remaining).lower()}. "
                )

        # Add a general conclusion
        report += f"\n\nOverall, {request.name} is a valued member of our classroom community. "
        report += f"With continued effort and focus, {pronoun} will achieve even greater success in {possessive} academic journey."

        return report
