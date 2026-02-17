import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'http://127.0.0.1:54321';
const ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';
const SERVICE_ROLE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';
const HONO_FUNCTION_URL = 'http://127.0.0.1:54321/functions/v1';
const baseClaimant = `${HONO_FUNCTION_URL}/level-app/case/claimant`;
const baseRespondent = `${HONO_FUNCTION_URL}/level-app/case/respondent`;
const baseCase = `${HONO_FUNCTION_URL}/level-app/case`;
const baseProfiles = `${HONO_FUNCTION_URL}/level-app/profiles`;
const password = 'Test123';

const newUsers = [
    {
        email: 'test-user@email.com',
        password: 'Test123',
        firstName: 'Testko',
        lastName: 'Testić',
    },
    {
        email: 'jurck222@gmail.com',
        password: 'Test123',
        firstName: 'Jure',
        lastName: 'Pavlovic',
    },
    {
        email: 'jure@thecalda.com',
        password: 'Test123',
        firstName: 'Jezus',
        lastName: 'Kristus',
    },
    {
        email: 'jure@caldausa.com',
        password: 'Test123',
        firstName: 'Jožef',
        lastName: 'K',
    },
    {
        email: 'jablana@email.com',
        password: 'Test123',
        firstName: 'Tvoja',
        lastName: 'Mami',
    },
    {
        email: 'mikic@email.com',
        password: 'Test123',
        firstName: 'Milan',
        lastName: 'Mikić',
    },
];

const neutralUsers = [
    {
        email: 'neutral1@example.com',
        password,
        firstName: 'Ana',
        lastName: 'Arbiter',
        mediatorProfileBody: {
            profile: {
                enableOffers: true,
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Mediator focused on family law and neighbor disputes with a calm, structured approach.',
                firstPracticeYear: 2004,
                yearsWithoutPracticing: 0,
                relevantQualifications: [
                    'Certified Family Mediator',
                    'LL.M. in Dispute Resolution',
                ],
                hourlyRate: '350.00',
                halfDayRate: '1400.00',
                fullDayRate: '2600.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    "I help families and neighbors resolve emotionally charged conflicts with clarity and empathy, keeping children's and community interests at the center.",
                shortProfessionalDescription: 'Family and neighbor disputes specialist.',
                resumeUrl: 'https://example.com/resume_ana_arbiter.pdf',
                agreedToEthicsPolicy: true,
                engagementLetterUrl: 'https://example.com/engagement_ana_arbiter.pdf',
                linkedEngagementLetter: 'https://test-url.si/ana',
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
        arbitratorProfileBody: {
            profile: {
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Arbitrator with experience in structured hearings and written awards for civil disputes.',
                firstPracticeYear: 2006,
                yearsWithoutPracticing: 0,
                relevantQualifications: [
                    'Arbitration Fundamentals Training',
                    'Award Writing Workshop',
                ],
                hourlyRate: '450.00',
                halfDayRate: '1800.00',
                fullDayRate: '3400.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I run efficient arbitrations with clear procedure, tight issue framing, and timely reasoned awards.',
                shortProfessionalDescription: 'Civil disputes arbitrator.',
                resumeUrl: 'https://example.com/resume_ana_arbiter_arbitration.pdf',
                agreedToEthicsPolicy: false,
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
    },
    {
        email: 'neutral2@example.com',
        password,
        firstName: 'Boris',
        lastName: 'Balance',
        mediatorProfileBody: {
            profile: {
                enableOffers: true,
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Specialist in commercial and small business disputes with strong financial literacy.',
                firstPracticeYear: 2010,
                yearsWithoutPracticing: 0,
                relevantQualifications: ['Commercial Mediation Certificate'],
                hourlyRate: '420.00',
                halfDayRate: '1700.00',
                fullDayRate: '3200.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I work with SMEs and founders to resolve partnership, shareholder, and supplier disputes quickly so they can get back to building their businesses.',
                shortProfessionalDescription: 'Commercial and business mediator.',
                resumeUrl: 'https://example.com/resume_boris_balance.pdf',
                agreedToEthicsPolicy: true,
                engagementLetterUrl: 'https://example.com/engagement_boris_balance.pdf',
                linkedEngagementLetter: 'https://test-url.si/boris',
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
        arbitratorProfileBody: {
            profile: {
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Arbitrator for business disputes with emphasis on clean record building and enforceable awards.',
                firstPracticeYear: 2011,
                yearsWithoutPracticing: 0,
                relevantQualifications: [
                    'Business Arbitration Certificate',
                    'Evidentiary Hearing Management',
                ],
                hourlyRate: '520.00',
                halfDayRate: '2100.00',
                fullDayRate: '3900.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I arbitrate partnership and contract disputes with disciplined schedules, focused hearings, and practical, reasoned decisions.',
                shortProfessionalDescription: 'Business disputes arbitrator.',
                resumeUrl: 'https://example.com/resume_boris_balance_arbitration.pdf',
                agreedToEthicsPolicy: false,
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
    },
    {
        email: 'neutral3@example.com',
        password,
        firstName: 'Cvetka',
        lastName: 'Calm',
        mediatorProfileBody: {
            profile: {
                enableOffers: true,
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Employment and workplace mediator with experience in HR and labor relations.',
                firstPracticeYear: 2008,
                yearsWithoutPracticing: 1,
                relevantQualifications: ['Workplace Mediation Diploma'],
                hourlyRate: '300.00',
                halfDayRate: '1200.00',
                fullDayRate: '2200.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I help employers and employees resolve conflicts around performance, discrimination claims, and team dynamics before they escalate.',
                shortProfessionalDescription: 'Employment and workplace mediator.',
                resumeUrl: 'https://example.com/resume_cvetka_calm.pdf',
                agreedToEthicsPolicy: true,
                engagementLetterUrl: 'https://example.com/engagement_cvetka_calm.pdf',
                linkedEngagementLetter: 'https://test-url.si/cvetka',
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
        arbitratorProfileBody: {
            profile: {
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Arbitrator for workplace and employment disputes with procedural fairness focus.',
                firstPracticeYear: 2009,
                yearsWithoutPracticing: 0,
                relevantQualifications: [
                    'Employment Arbitration Training',
                    'Decision Drafting Intensive',
                ],
                hourlyRate: '410.00',
                halfDayRate: '1600.00',
                fullDayRate: '3000.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I deliver clear schedules and balanced hearings for employment disputes, aiming for timely, well-structured awards.',
                shortProfessionalDescription: 'Employment disputes arbitrator.',
                resumeUrl: 'https://example.com/resume_cvetka_calm_arbitration.pdf',
                agreedToEthicsPolicy: false,
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
    },
    {
        email: 'neutral4@example.com',
        password,
        firstName: 'David',
        lastName: 'Decision',
        mediatorProfileBody: {
            profile: {
                enableOffers: true,
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Former in-house counsel with focus on tech and IP-related disputes.',
                firstPracticeYear: 2012,
                yearsWithoutPracticing: 0,
                relevantQualifications: ['IP Mediation Training', 'Bar Admission'],
                hourlyRate: '480.00',
                halfDayRate: '1900.00',
                fullDayRate: '3600.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I support startups and technology companies in resolving IP, licensing, and founder disputes without derailing product roadmaps.',
                shortProfessionalDescription: 'Tech and IP disputes mediator.',
                resumeUrl: 'https://example.com/resume_david_decision.pdf',
                agreedToEthicsPolicy: true,
                engagementLetterUrl: 'https://example.com/engagement_david_decision.pdf',
                linkedEngagementLetter: 'https://test-url.si/david',
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
        arbitratorProfileBody: {
            profile: {
                qualified: true,
                descriptionOfQualificationsInternalOnly:
                    'Tech/IP arbitrator experienced with licensing, SaaS, and founder disputes.',
                firstPracticeYear: 2013,
                yearsWithoutPracticing: 0,
                relevantQualifications: [
                    'IP Arbitration Seminar',
                    'Technology Contracts Workshop',
                ],
                hourlyRate: '620.00',
                halfDayRate: '2400.00',
                fullDayRate: '4600.00',
                judgeStatus: 'N/A',
                judicialPositions: null,
                professionalDescription:
                    'I arbitrate tech and IP disputes with crisp issue lists, scoped discovery, and fast awards that map directly to contract terms.',
                shortProfessionalDescription: 'Tech/IP disputes arbitrator.',
                resumeUrl: 'https://example.com/resume_david_decision_arbitration.pdf',
                agreedToEthicsPolicy: false,
            },
            states: [1],
            areasOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        },
    },
];

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
});

async function throwError(res, expectedStatus) {
    if (res.status !== expectedStatus) {
        console.log(res.url);
        let body;
        try {
            body = await res.json();
        } catch {
            body = { raw: await res.text() };
        }
        console.error('❌ Error:', JSON.stringify(body, null, 2));
        process.exit(1);
    }
}

async function loginTestUser(account) {
    const { data, error } = await admin.auth.signInWithPassword(account);

    if (error) {
        throw new Error(`Login failed for ${account.email}: ${error.message}`);
    }

    return {
        user: data.user,
        session: data.session,
        token: data.session?.access_token,
    };
}

async function claimantsOnboarding() {
    const claimant = await loginTestUser({
        email: 'test-user@email.com',
        password,
    });
    const claimantToken = claimant.token;

    const res = await fetch(`${baseClaimant}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${claimantToken}`,
        },
        body: JSON.stringify({ userCaseType: 'INDIVIDUAL' }),
    });
    const body = await res.json();
    const caseId = body.data.id;
    await throwError(res, 201);

    const addClaimantInfoRes = await fetch(
        `${baseClaimant}/${caseId}/claimant-info`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${claimantToken}`,
            },
            body: JSON.stringify({
                email: 'test-user@email.com',
                fullName: 'Jure Pavlovic',
                isAttorney: false,
                attorney: {
                    email: 'jure@caldausa.com',
                    fullName: 'Jezus Kristus',
                },
                additionalClaimants: [
                    {
                        email: 'jablana@email.com',
                        fullName: 'Claimant Viewer',
                    },
                ],
            }),
        },
    );

    await throwError(addClaimantInfoRes, 201);

    const addRespondentInfoRes = await fetch(
        `${baseClaimant}/${caseId}/respondent-info`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${claimantToken}`,
            },
            body: JSON.stringify({
                email: 'jure@thecalda.com',
                fullName: 'Janez Kranjski',
                isAttorney: false,
                attorney: {
                    email: 'jurck222@gmail.com',
                    fullName: 'Jožef K',
                },
            }),
        },
    );

    await throwError(addRespondentInfoRes, 201);

    const addIncidentInfoRes = await fetch(`${baseClaimant}/${caseId}/incident`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${claimantToken}`,
        },
        body: JSON.stringify({
            incidentLocation: 'Remote',
            incidentStatus: 'DONE',
            incidentStartDate: '2025-08-19T06:07:33.530Z',
            incidentEndDate: '2025-08-19T06:07:33.567Z',
        }),
    });

    await throwError(addIncidentInfoRes, 200);

    const addClaimantSubmissions = await fetch(
        `${baseClaimant}/${caseId}/submission`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${claimantToken}`,
            },
            body: JSON.stringify({
                petitionSchema: {
                    petition: 'This is a petition',
                    petitionSummary: 'This is a petition summary',
                    petitionType: 'typed',
                },
                submissionFiles: [
                    {
                        name: 'testFile',
                        fileUrl: 'https://test-file.si',
                        fileType: 'exhibit',
                    },
                    {
                        name: 'testFile',
                        fileUrl: 'test/example.png',
                        fileType: 'contract',
                        disputeResolutionLevelAgreed: true,
                    },
                ],
                submissionPeople: [
                    {
                        fullName: 'Željko Bebek',
                        email: 'zeljko.bebek@hotmail.com',
                        phoneNumber: '+38651212176',
                        description: 'This is Željko Bebek',
                        type: 'expert',
                    },
                    {
                        fullName: 'Tvoja Mami',
                        email: 'tvoja.mami@hotmail.com',
                        phoneNumber: '+38651212176',
                        description: 'This is Tvoja Mami',
                        type: 'witness',
                    },
                ],
            }),
        },
    );

    await throwError(addClaimantSubmissions, 200);

    const addClaimantDamages = await fetch(`${baseClaimant}/${caseId}/damages`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${claimantToken}`,
        },
        body: JSON.stringify({
            damages: 5000,
            description: 'For the kids',
            governingLaw: 'Texas',
        }),
    });

    await throwError(addClaimantDamages, 200);

    const claimantPaysRes = await fetch(
        `${baseClaimant}/${caseId}/pay-filing-fee`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${claimantToken}`,
            },
        },
    );

    await throwError(claimantPaysRes, 200);

    return { caseId, claimantToken };
}

async function acceptCaseInvite(email, caseId) {
    const user = await loginTestUser({
        email,
        password,
    });

    const userJwt = user.token;

    const accpetInviteRes = await fetch(`${baseCase}/invite/${caseId}/accept`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${userJwt}` },
    });
    await throwError(accpetInviteRes, 200);
}

async function respondentOnboarding(caseId) {
    const respondent = await loginTestUser({
        email: 'jure@thecalda.com',
        password,
    });

    const respondentJwt = respondent.token;

    const accpetInviteRes = await fetch(`${baseCase}/invite/${caseId}/accept`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${respondentJwt}` },
    });
    await throwError(accpetInviteRes, 200);

    const addRepresentationRes = await fetch(
        `${baseRespondent}/${caseId}/representation`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${respondentJwt}`,
            },
            body: JSON.stringify({
                representationType: 'INDIVIDUAL',
                authorized: true,
            }),
        },
    );

    await throwError(addRepresentationRes, 201);

    const reviewClaimantRes = await fetch(
        `${baseRespondent}/${caseId}/claimant-info`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${respondentJwt}`,
            },
        },
    );

    await throwError(reviewClaimantRes, 200);

    const addRespondentRes = await fetch(
        `${baseRespondent}/${caseId}/respondent-info`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${respondentJwt}`,
            },
            body: JSON.stringify({
                isAttorney: false,
                attorney: {
                    email: 'jurck222@gmail.com',
                    fullName: 'Jožef K',
                },
            }),
        },
    );

    await throwError(addRespondentRes, 201);

    const addIncidentRes = await fetch(`${baseRespondent}/${caseId}/incident`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${respondentJwt}`,
        },
        body: JSON.stringify({
            incidentLocation: 'Remote',
            incidentStatus: 'DONE',
            incidentStartDate: '2025-08-19T06:07:33.530Z',
            incidentEndDate: '2025-08-19T06:07:33.567Z',
        }),
    });

    await throwError(addIncidentRes, 200);

    const addSubmissionsRes = await fetch(
        `${baseRespondent}/${caseId}/submission`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${respondentJwt}`,
            },
            body: JSON.stringify({
                petitionSchema: {
                    petition: 'This is a petition',
                    petitionSummary: 'This is a petition summary',
                    petitionType: 'typed',
                },
                submissionFiles: [
                    {
                        name: 'testFile',
                        fileUrl: 'https://test-file.si',
                        fileType: 'exhibit',
                    },
                    {
                        name: 'testFile',
                        fileUrl: 'https://test-file.si',
                        fileType: 'contract',
                        disputeResolutionLevelAgreed: true,
                    },
                ],
                submissionPeople: [
                    {
                        fullName: 'Željko Bebek',
                        email: 'zeljko.bebek@hotmail.com',
                        phoneNumber: '+38651212176',
                        description: 'This is Željko Bebek',
                        type: 'expert',
                    },
                    {
                        fullName: 'Tvoja Mami',
                        email: 'tvoja.mami@hotmail.com',
                        phoneNumber: '+38651212176',
                        description: 'This is Tvoja Mami',
                        type: 'witness',
                    },
                ],
            }),
        },
    );

    await throwError(addSubmissionsRes, 200);

    const addDamagesRes = await fetch(`${baseRespondent}/${caseId}/damages`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${respondentJwt}`,
        },
        body: JSON.stringify({
            damages: 400,
            description: 'F them kids',
            governingLaw: 'Alabama',
        }),
    });

    await throwError(addDamagesRes, 200);

    const payFillingfeeRes = await fetch(
        `${baseRespondent}/${caseId}/pay-filing-fee`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${respondentJwt}`,
            },
        },
    );

    await throwError(payFillingfeeRes, 200);

    return respondentJwt;
}

async function createUsers(users) {
    if (!SERVICE_ROLE_KEY) {
        throw new Error('Set SERVICE_ROLE_KEY for ADMIN_MODE');
    }

    for (const u of users) {
        try {
            const { data, error } = await admin.auth.admin.createUser({
                email: u.email,
                password: u.password,
                email_confirm: true,
                user_metadata: {
                    first_name: u.firstName,
                    last_name: u.lastName,
                },
            });

            if (error) throw error;

            console.log('✅ Admin-created & confirmed:', {
                id: data.user.id,
                email: data.user.email,
            });
        } catch (err) {
            console.error(`❌ Failed for ${u.email}:`, err?.message || err);
        }
    }
}

async function createAndCompleteMediatorProfile(token, body) {
    const createRes = await fetch(`${baseProfiles}/mediator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    await throwError(createRes, 201);

    const completeRes = await fetch(`${baseProfiles}/mediator/complete`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    await throwError(completeRes, 201);
}

async function createAndCompleteArbitratorProfile(token, body) {
    const createRes = await fetch(`${baseProfiles}/arbitrator`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    await throwError(createRes, 201);

    const completeRes = await fetch(
        `${baseProfiles}/agree-to-ethics/arbitrator`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );

    await throwError(completeRes, 200);
}

async function createNeutralProfiles() {
    for (const u of neutralUsers) {
        const neutral = await loginTestUser({
            email: u.email,
            password: u.password,
        });

        if (!neutral.token) {
            throw new Error(`No token returned for neutral ${u.email}`);
        }

        await createAndCompleteMediatorProfile(
            neutral.token,
            u.mediatorProfileBody,
        );

        const arbitratorBody = {
            ...u.arbitratorProfileBody,
            areasOfExpertise: u.mediatorProfileBody.areasOfExpertise,
        };

        await createAndCompleteArbitratorProfile(neutral.token, arbitratorBody);

        console.log(
            `✅ Neutral profiles created & completed (mediator + arbitrator) for ${u.email}`,
        );
    }
}

async function skipToArbitration(claimantToken, caseId) {
    const res = await fetch(`${baseCase}/${caseId}/arbitration/skip-mediation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${claimantToken}`,
        },
    });
    await throwError(res, 200);
    console.log('✅ Skipped mediation, proceeding to arbitration');
}

async function initArbitrationSession(token, caseId, proposedHours) {
    const res = await fetch(`${baseCase}/${caseId}/arbitration/init`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ proposedHours }),
    });
    await throwError(res, 201);
    const body = await res.json();
    return body.data;
}

async function submitArbitrationOptions(token, caseId, sessionId, options) {
    const res = await fetch(
        `${baseCase}/${caseId}/arbitration/${sessionId}/options`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(options),
        },
    );
    await throwError(res, 201);
    const body = await res.json();
    return body.data;
}

async function submitArbitrationCriteria(token, caseId, sessionId, criteria) {
    const res = await fetch(
        `${baseCase}/${caseId}/arbitration/${sessionId}/criteria`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(criteria),
        },
    );
    await throwError(res, 201);
    const body = await res.json();
    return body.data;
}

async function getSystemNeutrals(token, caseId, sessionId, role) {
    const res = await fetch(
        `${baseCase}/${caseId}/arbitration/${sessionId}/system-neutrals?role=${role}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    await throwError(res, 200);
    const body = await res.json();
    return body.data;
}

async function submitNeutralPreferences(
    token,
    caseId,
    sessionId,
    systemNeutralIds,
    orderedByName,
    role,
) {
    const res = await fetch(
        `${baseCase}/${caseId}/arbitration/${sessionId}/system-neutrals?role=${role}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ systemNeutralIds, orderedByName }),
        },
    );
    await throwError(res, 200);
    const body = await res.json();
    return body.data;
}

async function respondToProposedNeutral(
    token,
    caseId,
    sessionId,
    proposedNeutralId,
    status,
) {
    const res = await fetch(
        `${baseCase}/${caseId}/arbitration/${sessionId}/propose-neutral/${proposedNeutralId}/respond`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        },
    );
    await throwError(res, 200);
    const body = await res.json();
    return body.data;
}

async function neutralAcceptInvite(neutralToken, caseId) {
    const res = await fetch(`${baseCase}/invite/${caseId}/accept`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${neutralToken}`,
        },
    });
    await throwError(res, 200);
}

async function submitConflictCheck(neutralToken, caseId, conflictType) {
    const res = await fetch(`${baseCase}/${caseId}/arbitration/conflict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${neutralToken}`,
        },
        body: JSON.stringify({ conflictType }),
    });
    await throwError(res, 201);
    const body = await res.json();
    return body.data;
}

async function getArbitrationSession(token, caseId) {
    const res = await fetch(`${baseCase}/${caseId}/arbitration`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    await throwError(res, 200);
    const body = await res.json();
    return body.data;
}

async function setupArbitration() {
    const { caseId, claimantToken } = await claimantsOnboarding();
    const respondentToken = await respondentOnboarding(caseId);

    await acceptCaseInvite('jurck222@gmail.com', caseId);
    await acceptCaseInvite('jablana@email.com', caseId);
    await acceptCaseInvite('jure@caldausa.com', caseId);

    console.log('✅ Case created with id: ' + caseId);

    await skipToArbitration(claimantToken, caseId);

    const claimantSession = await initArbitrationSession(
        claimantToken,
        caseId,
        4,
    );
    console.log('✅ Claimant initialized arbitration session');

    await initArbitrationSession(respondentToken, caseId, 4);
    console.log('✅ Respondent initialized arbitration session');

    const sessionId = claimantSession.id;

    const arbitrationOptions = {
        arbitrationOptionType: 'standard',
        paperOnly: false,
        expertOnPanel: false,
        submitterFullName: 'Jure Pavlovic',
    };

    await submitArbitrationOptions(
        claimantToken,
        caseId,
        sessionId,
        arbitrationOptions,
    );
    console.log('✅ Claimant submitted arbitration options');

    await submitArbitrationOptions(
        respondentToken,
        caseId,
        sessionId,
        arbitrationOptions,
    );
    console.log('✅ Respondent submitted arbitration options');

    const criteria = {
        isNeutralFormerJudge: false,
        minYearsOfExperience: 5,
        areaOfExpertise: ['06f4e277-3f27-48d9-915c-2c212daa49c8'],
        targetHourlyRate: 500,
        submitterFullName: 'Jure Pavlovic',
    };

    await submitArbitrationCriteria(claimantToken, caseId, sessionId, criteria);
    console.log('✅ Claimant submitted arbitration criteria');

    await submitArbitrationCriteria(respondentToken, caseId, sessionId, criteria);
    console.log('✅ Respondent submitted arbitration criteria');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const systemNeutrals = await getSystemNeutrals(
        claimantToken,
        caseId,
        sessionId,
        'arbitrator',
    );
    console.log(`✅ Retrieved ${systemNeutrals.length} system neutrals`);

    const systemNeutralIds = systemNeutrals.map((n) => n.id);

    await submitNeutralPreferences(
        claimantToken,
        caseId,
        sessionId,
        systemNeutralIds,
        'Jure Pavlovic',
        'arbitrator',
    );
    console.log('✅ Claimant submitted neutral ordering');

    await submitNeutralPreferences(
        respondentToken,
        caseId,
        sessionId,
        systemNeutralIds,
        'Janez Kranjski',
        'arbitrator',
    );
    console.log('✅ Respondent submitted neutral ordering');

    await new Promise((resolve) => setTimeout(resolve, 500));

    const updatedSession = await getArbitrationSession(claimantToken, caseId);
    const selectedNeutral = updatedSession.selectedNeutrals?.find(
        (n) => n.status === 'accepted',
    );

    if (!selectedNeutral) {
        console.error('❌ No accepted neutral found after ordering');
        process.exit(1);
    }

    console.log(`✅ Top neutral selected: ${selectedNeutral.id}`);
    console.log(selectedNeutral);

    let neutralUserEmail = selectedNeutral.email;

    if (!neutralUserEmail) {
        const dbClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
            auth: { autoRefreshToken: false, persistSession: false },
        });

        const { data: profileData } = await dbClient
            .from('profiles')
            .select('user_id')
            .eq('id', selectedNeutral.profileId)
            .single();

        if (profileData?.user_id) {
            const { data: userData } = await dbClient
                .from('users')
                .select('email')
                .eq('id', profileData.user_id)
                .single();

            neutralUserEmail = userData?.email;
        }
    }

    if (!neutralUserEmail) {
        console.error('❌ Could not find neutral user email');
        process.exit(1);
    }

    console.log(`✅ Found neutral email: ${neutralUserEmail}`);

    const neutral = await loginTestUser({
        email: neutralUserEmail,
        password,
    });

    await neutralAcceptInvite(neutral.token, caseId);
    console.log('✅ Neutral accepted case invite');

    await submitConflictCheck(neutral.token, caseId, 'no_conflict');
    console.log('✅ Neutral submitted conflict check (no conflict)');

    await new Promise((resolve) => setTimeout(resolve, 500));

    const finalSession = await getArbitrationSession(claimantToken, caseId);
    console.log(`\n✅ Final session status: ${finalSession.status}`);

    console.log('\n========================================');
    console.log('ARBITRATION SETUP COMPLETE');
    console.log('========================================');
    console.log(`Case ID: ${caseId}`);
    console.log(`Session ID: ${sessionId}`);
    console.log(`Selected Neutral Email: ${neutralUserEmail}`);
    console.log(`Final Session Status: ${finalSession.status}`);
    console.log('========================================\n');

    return {
        caseId,
        sessionId,
        neutralEmail: neutralUserEmail,
        sessionStatus: finalSession.status,
    };
}

await createUsers([...newUsers, ...neutralUsers]).catch((e) => {
    console.error('❌ Error:', e?.message || e);
    process.exit(1);
});

await createNeutralProfiles().catch((e) => {
    console.error('❌ Error creating neutral profiles:', e?.message || e);
    process.exit(1);
});

await setupArbitration().catch((e) => {
    console.error('❌ Error:', e?.message || e);
    process.exit(1);
});
