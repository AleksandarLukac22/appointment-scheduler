import { BaseEntity, TableFilter, TableFilterContext, TableFilterSortMeta, MimeTypes, Namebook } from 'spiderly';



export class Appointment extends BaseEntity
{
    isCanceled?: boolean;
	reservedAt?: Date;
	serviceDisplayName?: string;
	serviceId?: number;
	expiredAt?: Date;
	doctorDisplayName?: string;
	doctorId?: number;
	patientDisplayName?: string;
	patientId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        isCanceled,
		reservedAt,
		serviceDisplayName,
		serviceId,
		expiredAt,
		doctorDisplayName,
		doctorId,
		patientDisplayName,
		patientId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        isCanceled?: boolean;
		reservedAt?: Date;
		serviceDisplayName?: string;
		serviceId?: number;
		expiredAt?: Date;
		doctorDisplayName?: string;
		doctorId?: number;
		patientDisplayName?: string;
		patientId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Appointment'); 

        this.isCanceled = isCanceled;
		this.reservedAt = reservedAt;
		this.serviceDisplayName = serviceDisplayName;
		this.serviceId = serviceId;
		this.expiredAt = expiredAt;
		this.doctorDisplayName = doctorDisplayName;
		this.doctorId = doctorId;
		this.patientDisplayName = patientDisplayName;
		this.patientId = patientId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class AppointmentSaveBody extends BaseEntity
{
    appointmentDTO?: Appointment;

    constructor(
    {
        appointmentDTO
    }:{
        appointmentDTO?: Appointment;     
    } = {}
    ) {
        super('AppointmentSaveBody'); 

        this.appointmentDTO = appointmentDTO;
    }
}


export class AppointmentMainUIForm extends BaseEntity
{
    appointmentDTO?: Appointment;

    constructor(
    {
        appointmentDTO
    }:{
        appointmentDTO?: Appointment;     
    } = {}
    ) {
        super('AppointmentMainUIForm'); 

        this.appointmentDTO = appointmentDTO;
    }
}


export class Gender extends BaseEntity
{
    name?: string;
	id?: number;

    constructor(
    {
        name,
		id
    }:{
        name?: string;
		id?: number;     
    } = {}
    ) {
        super('Gender'); 

        this.name = name;
		this.id = id;
    }
}


export class GenderSaveBody extends BaseEntity
{
    genderDTO?: Gender;

    constructor(
    {
        genderDTO
    }:{
        genderDTO?: Gender;     
    } = {}
    ) {
        super('GenderSaveBody'); 

        this.genderDTO = genderDTO;
    }
}


export class GenderMainUIForm extends BaseEntity
{
    genderDTO?: Gender;

    constructor(
    {
        genderDTO
    }:{
        genderDTO?: Gender;     
    } = {}
    ) {
        super('GenderMainUIForm'); 

        this.genderDTO = genderDTO;
    }
}


export class Notification extends BaseEntity
{
    title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	isMarkedAsRead?: boolean;

    constructor(
    {
        title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt,
		isMarkedAsRead
    }:{
        title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('Notification'); 

        this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationSaveBody extends BaseEntity
{
    notificationDTO?: Notification;
	selectedRecipientsIds?: number[];
	unselectedRecipientsIds?: number[];
	areAllRecipientsSelected?: boolean;
	recipientsTableFilter?: TableFilter;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDTO,
		selectedRecipientsIds,
		unselectedRecipientsIds,
		areAllRecipientsSelected,
		recipientsTableFilter,
		isMarkedAsRead
    }:{
        notificationDTO?: Notification;
		selectedRecipientsIds?: number[];
		unselectedRecipientsIds?: number[];
		areAllRecipientsSelected?: boolean;
		recipientsTableFilter?: TableFilter;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('NotificationSaveBody'); 

        this.notificationDTO = notificationDTO;
		this.selectedRecipientsIds = selectedRecipientsIds;
		this.unselectedRecipientsIds = unselectedRecipientsIds;
		this.areAllRecipientsSelected = areAllRecipientsSelected;
		this.recipientsTableFilter = recipientsTableFilter;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationMainUIForm extends BaseEntity
{
    notificationDTO?: Notification;

    constructor(
    {
        notificationDTO
    }:{
        notificationDTO?: Notification;     
    } = {}
    ) {
        super('NotificationMainUIForm'); 

        this.notificationDTO = notificationDTO;
    }
}


export class Service extends BaseEntity
{
    name?: string;
	duration?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        name,
		duration,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        name?: string;
		duration?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('Service'); 

        this.name = name;
		this.duration = duration;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class ServiceSaveBody extends BaseEntity
{
    serviceDTO?: Service;

    constructor(
    {
        serviceDTO
    }:{
        serviceDTO?: Service;     
    } = {}
    ) {
        super('ServiceSaveBody'); 

        this.serviceDTO = serviceDTO;
    }
}


export class ServiceMainUIForm extends BaseEntity
{
    serviceDTO?: Service;

    constructor(
    {
        serviceDTO
    }:{
        serviceDTO?: Service;     
    } = {}
    ) {
        super('ServiceMainUIForm'); 

        this.serviceDTO = serviceDTO;
    }
}


export class UserExtended extends BaseEntity
{
    profilePictureBlobNameData?: string;
	profilePictureBlobName?: string;
	email?: string;
	birthDate?: Date;
	hasLoggedInWithExternalProvider?: boolean;
	isDisabled?: boolean;
	genderDisplayName?: string;
	genderId?: number;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        profilePictureBlobNameData,
		profilePictureBlobName,
		email,
		birthDate,
		hasLoggedInWithExternalProvider,
		isDisabled,
		genderDisplayName,
		genderId,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        profilePictureBlobNameData?: string;
		profilePictureBlobName?: string;
		email?: string;
		birthDate?: Date;
		hasLoggedInWithExternalProvider?: boolean;
		isDisabled?: boolean;
		genderDisplayName?: string;
		genderId?: number;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('UserExtended'); 

        this.profilePictureBlobNameData = profilePictureBlobNameData;
		this.profilePictureBlobName = profilePictureBlobName;
		this.email = email;
		this.birthDate = birthDate;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.isDisabled = isDisabled;
		this.genderDisplayName = genderDisplayName;
		this.genderId = genderId;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UserExtendedSaveBody extends BaseEntity
{
    userExtendedDTO?: UserExtended;

    constructor(
    {
        userExtendedDTO
    }:{
        userExtendedDTO?: UserExtended;     
    } = {}
    ) {
        super('UserExtendedSaveBody'); 

        this.userExtendedDTO = userExtendedDTO;
    }
}


export class UserExtendedMainUIForm extends BaseEntity
{
    userExtendedDTO?: UserExtended;

    constructor(
    {
        userExtendedDTO
    }:{
        userExtendedDTO?: UserExtended;     
    } = {}
    ) {
        super('UserExtendedMainUIForm'); 

        this.userExtendedDTO = userExtendedDTO;
    }
}


export class UserNotification extends BaseEntity
{
    notificationDisplayName?: string;
	notificationId?: number;
	userDisplayName?: string;
	userId?: number;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDisplayName,
		notificationId,
		userDisplayName,
		userId,
		isMarkedAsRead
    }:{
        notificationDisplayName?: string;
		notificationId?: number;
		userDisplayName?: string;
		userId?: number;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('UserNotification'); 

        this.notificationDisplayName = notificationDisplayName;
		this.notificationId = notificationId;
		this.userDisplayName = userDisplayName;
		this.userId = userId;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class UserNotificationSaveBody extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationSaveBody'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}


export class UserNotificationMainUIForm extends BaseEntity
{
    userNotificationDTO?: UserNotification;

    constructor(
    {
        userNotificationDTO
    }:{
        userNotificationDTO?: UserNotification;     
    } = {}
    ) {
        super('UserNotificationMainUIForm'); 

        this.userNotificationDTO = userNotificationDTO;
    }
}

