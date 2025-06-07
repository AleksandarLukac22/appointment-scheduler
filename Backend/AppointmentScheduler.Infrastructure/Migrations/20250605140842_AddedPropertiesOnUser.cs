using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppointmentScheduler.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedPropertiesOnUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "GenderId",
                table: "User",
                type: "bigint",
                nullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsCanceled",
                table: "Appointment",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AlterColumn<bool>(
                name: "HasConfirmed",
                table: "Appointment",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<int>(
                name: "ConfirmationEmailSentCounter",
                table: "Appointment",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Gender",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(70)", maxLength: 70, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gender", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_User_GenderId",
                table: "User",
                column: "GenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Gender_GenderId",
                table: "User",
                column: "GenderId",
                principalTable: "Gender",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_User_Gender_GenderId",
                table: "User");

            migrationBuilder.DropTable(
                name: "Gender");

            migrationBuilder.DropIndex(
                name: "IX_User_GenderId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "User");

            migrationBuilder.DropColumn(
                name: "GenderId",
                table: "User");

            migrationBuilder.DropColumn(
                name: "ConfirmationEmailSentCounter",
                table: "Appointment");

            migrationBuilder.AlterColumn<bool>(
                name: "IsCanceled",
                table: "Appointment",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "HasConfirmed",
                table: "Appointment",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }
    }
}
