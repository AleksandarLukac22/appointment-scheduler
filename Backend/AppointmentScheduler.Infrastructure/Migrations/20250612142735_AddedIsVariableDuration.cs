using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentScheduler.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedIsVariableDuration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmationEmailSentCounter",
                table: "Appointment");

            migrationBuilder.DropColumn(
                name: "HasConfirmed",
                table: "Appointment");

            migrationBuilder.AddColumn<bool>(
                name: "IsVariableDuration",
                table: "Service",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsVariableDuration",
                table: "Service");

            migrationBuilder.AddColumn<int>(
                name: "ConfirmationEmailSentCounter",
                table: "Appointment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "HasConfirmed",
                table: "Appointment",
                type: "bit",
                nullable: true);
        }
    }
}
