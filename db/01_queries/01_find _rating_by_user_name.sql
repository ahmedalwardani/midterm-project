select ratings.rating
from ratings
join resources on resources.id = resource_id
join users on users.id = owner_id
where users.name = 'Alice';
